import { FileInfo } from '../types'
import jsonata from 'jsonata'
import path from 'upath'
import { PathLike } from 'fs'
import { Logger, LOG_LEVEL } from '../lib/log'

// https://docs.jsonata.org/boolean-functions and https://docs.jsonata.org/boolean-operators
export enum QUERY_BOOLEAN_OPERATORS {
	AND = 'AND',
	OR = 'OR',
	NOT = 'NOT',
}

export enum QUERY_MODIFIER_OPERATIONS {
	EQUALS = '=',
	NOT = '!=',
	GREATERTHAN = '>',
	GE = '>=', // greater or equal
	LESSTHAN = '<',
	LE = '<=', // less or equal
	IN = 'IN', // https://docs.jsonata.org/comparison-operators#in-inclusion
	EXISTS = 'EXISTS',
	CONTAINS = 'CONTAINS',
}

type BaseQueryOpts = {
	sortBy?: string // can be a top-level item or an item in the config. Nested items separated by `.`
	limit?: number
	isAscending?: boolean
}

type QueryPredicate = {
	key: string
	value?: any
	modifier: QUERY_MODIFIER_OPERATIONS
	operator?: QUERY_BOOLEAN_OPERATORS
}
export type QueryOpts = BaseQueryOpts & {
	rawQuery?: string // JSONata string. If this exists, predicate isn't used.
	predicates?: QueryPredicate[] // key value pair where the key is the item in the db, and the value is what they should match.
}

type TagQuery = {
	tag: string
	operator: QUERY_BOOLEAN_OPERATORS
}

export type TagQueryOpts = BaseQueryOpts & {
	tags: TagQuery[]
}

export class FileDB {
	protected files: FileInfo[]
	constructor(files: FileInfo[]) {
		this.files = files
	}

	public query(queryOpts: QueryOpts) {
		let queryResult: FileInfo[] = []
		if (queryOpts.rawQuery) {
			const expression = jsonata(queryOpts.rawQuery)
			queryResult = expression.evaluate(this.files)
		} else if (queryOpts.predicates) {
			let rawQuery = ''
			let pointer = 0
			for (let predicate of queryOpts.predicates) {
				// build the query
				let queryPiece = ''
				switch (predicate.modifier) {
					case QUERY_MODIFIER_OPERATIONS.EQUALS:
						queryPiece = `${predicate.key} = ${JSON.stringify(predicate.value)}`
						break
					case QUERY_MODIFIER_OPERATIONS.GREATERTHAN:
						queryPiece = `${predicate.key} > ${JSON.stringify(predicate.value)}`
						break
					case QUERY_MODIFIER_OPERATIONS.GE:
						queryPiece = `${predicate.key} >= ${JSON.stringify(predicate.value)}`
						break
					case QUERY_MODIFIER_OPERATIONS.LESSTHAN:
						queryPiece = `${predicate.key} < ${JSON.stringify(predicate.value)}`
						break
					case QUERY_MODIFIER_OPERATIONS.LE:
						queryPiece = `${predicate.key} <= ${JSON.stringify(predicate.value)}`
						break
					case QUERY_MODIFIER_OPERATIONS.NOT:
						queryPiece = `${predicate.key} != ${JSON.stringify(predicate.value)}`
						break
					case QUERY_MODIFIER_OPERATIONS.EXISTS:
						queryPiece = `${predicate.key}`
						break
					case QUERY_MODIFIER_OPERATIONS.IN:
						queryPiece = `${JSON.stringify(predicate.value)} in ${predicate.key}`
						break
					case QUERY_MODIFIER_OPERATIONS.CONTAINS:
						queryPiece = `${predicate.key}.$contains(${JSON.stringify(predicate.value)})`
						break
				}

				if (pointer > 0) {
					switch (predicate.operator) {
						case QUERY_BOOLEAN_OPERATORS.AND:
							rawQuery += ` and ${queryPiece}`
							break
						case QUERY_BOOLEAN_OPERATORS.OR:
							rawQuery += ` or ${queryPiece}`
							break
						case QUERY_BOOLEAN_OPERATORS.NOT:
							rawQuery += ` and $not(${queryPiece})`
							break
						default:
							rawQuery += ` and ${queryPiece}`
					}
				} else {
					if (predicate.operator === QUERY_BOOLEAN_OPERATORS.NOT) {
						rawQuery += `$not(${queryPiece})`
					} else {
						rawQuery += queryPiece
					}
				}
				pointer += 1
			}

			Logger.log(LOG_LEVEL.DEBUG, 'performing query: ', `$[${rawQuery}]`)

			// wrap the query
			const expression = jsonata(`$[${rawQuery}]`)
			queryResult = expression.evaluate(this.files)
		} else {
			return []
		}

		queryResult = queryResult ?? []
		if (!Array.isArray(queryResult)) {
			queryResult = [queryResult]
		}

		// now do the sort
		if (queryOpts.sortBy) {
			queryResult.sort((a, b) => {
				if (a[queryOpts.sortBy || 'id'] == b[queryOpts.sortBy || 'id']) {
					return 0
				}
				if (a[queryOpts.sortBy || 'id'] > b[queryOpts.sortBy || 'id']) {
					return queryOpts.isAscending ? -1 : 1
				}
				return queryOpts.isAscending ? 1 : -1
			})
		}

		if (queryOpts.limit) {
			queryResult = queryResult.slice(0, queryOpts.limit)
		}

		return queryResult
	}

	/**
	 * Helper function to query tags in files, where tags are defined in the file's configuration
	 * as an array of strings, representing the tags.
	 * @param query
	 * @returns
	 */
	public queryTags(query: TagQueryOpts) {
		// jsonata for querying the tags: $["blog" in configuration.tags]
		const regularQuery: QueryOpts = {
			predicates: [],
			sortBy: query.sortBy,
			limit: query.limit,
			isAscending: query.isAscending,
		}
		for (let tagQuery of query.tags) {
			const predicate: QueryPredicate = {
				key: 'configuration.tags',
				value: tagQuery.tag,
				operator: tagQuery.operator,
				modifier: QUERY_MODIFIER_OPERATIONS.IN,
			}
			regularQuery.predicates?.push(predicate)
		}

		return this.query(regularQuery)
	}

	/**
	 * Helper function to query for files that are in the same directory as one provided
	 * @param directory
	 * @param opts
	 * @param alsoMatchSubdirectories
	 * @returns
	 */
	public queryDirectory(
		directory: PathLike,
		opts: QueryOpts = {},
		alsoMatchSubdirectories?: boolean
	) {
		const predicate: QueryPredicate = {
			key: 'sourceDir',
			value: path.resolve(directory),
			modifier: alsoMatchSubdirectories
				? QUERY_MODIFIER_OPERATIONS.CONTAINS
				: QUERY_MODIFIER_OPERATIONS.EQUALS,
		}

		return this.query({
			predicates: [predicate, ...(opts.predicates ?? [])],
			limit: opts.limit,
			isAscending: opts.isAscending,
			sortBy: opts.sortBy,
		})
	}

	public get all() {
		return this.files
	}
}
