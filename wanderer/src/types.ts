import { PathLike } from "fs"

export type Configuration = Record<string, any>

export enum CONFIG_RECURSION_LEVEL {
	NONE,
	IMMEDIATE_PARENT,
	ALL,
}

export type SiteConfig = {
	plugins?: string[] // Can either be relative paths (to the base site directory), or names of included npm modules.
	slugifyFunction?: string // an exported function to call as the slugify function for URLs
} & Configuration

type DirAndPageCommonConfig = {
	private?: boolean
	layout?: string // name of the layout file used to build the page(s)
	feeds?: Record<string, any>
	tags?: string[]
}

export type DirConfig = {
	dir?: string
} & DirAndPageCommonConfig &
	Configuration

export type PageConfig = DirAndPageCommonConfig & Configuration

export type SiteInfo = {
	siteConfiguration: SiteConfig
	contentDirectory: string
	frameDirectory: string
	buildDirectory: string
	cacheDirectory: string
}

export type FileInfo = {
	sourcePath: string
	sourceDir: string
	name: string
	ext: string
	created: Date
	updated?: Date
	date?: Date
	id: string // unique identifier
	configuration?: Configuration

	// gets populated later
	url?: string
	title?: string // title can have spaces in it, which can also be wikilinked.
}

/**
 * Used to refer to a different page without needing the whole page object
 */
export type PageReference = {
	configuration?: Configuration
	sourceName: string // name of the page before any page-specific processing
	created?: Date
	updated?: Date
	date?: Date
	id: string
	title: string
	url: string
	nextPage?: PageReference
	previousPage?: PageReference
}

export type Page = FileInfo & {
	configuration?: PageConfig
	isPage: true

	text: string

	// html content of the page. Plugins are responsible for filling this out.
	// Note that plugins should fill it with the html *content* of the page,
	// without any of the templates, layout or boilerplate around it.
	html?: string
}

// DB Types


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

export type QueryPredicate = {
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

// PLUGIN TYPES

export interface IFileDB {
	all: FileInfo[]
	query(queryOpts: QueryOpts): FileInfo[]
	queryTags(query: TagQueryOpts): FileInfo[]
	queryDirectory(
		directory: PathLike,
		opts: QueryOpts,
		alsoMatchSubdirectories?: boolean
	): FileInfo[]
}

export interface IFileCache {
	generate(): Promise<void>
	getConfigForFile(fileId: string, recursive: CONFIG_RECURSION_LEVEL): PageConfig
	allFiles: FileInfo[]
	db: IFileDB
	getFileFromPath(sourcePath: string): FileInfo[]
	getFilesWithTitle(title: string): FileInfo[]
	getAllFilesWithExts(exts: string[], not?: boolean): FileInfo[]
	getFilesWithSimilarNames(file: FileInfo): FileInfo[]
}