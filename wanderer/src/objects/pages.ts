import path from 'upath'
import fs from 'fs'
import { readdirSyncRecursive } from '../lib/recursive-readdir'
import { Configuration, FileInfo, Page, PageConfig, SiteInfo } from '../types'
import { isText } from 'istextorbinary'

import * as toml from '@iarna/toml'
import { getTextAfterFrontmatter, streamFrontmatter } from '../lib/frontmatter'
import { tempo } from '../lib/tempo'
import { FileDB, QueryOpts, QUERY_BOOLEAN_OPERATORS, QUERY_MODIFIER_OPERATIONS } from './db'
import { Logger, LOG_LEVEL } from '../lib/log'

export enum CONFIG_RECURSION_LEVEL {
	NONE,
	IMMEDIATE_PARENT,
	ALL,
}

export class FileCache {
	// these are stored in the format { fileId: FileInfo }
	protected files: Record<string, FileInfo> = {}
	protected _db: FileDB

	// stored in the format { relative/path/to/directory: config }
	protected nestedConfiguration: Record<string, Configuration> = {}

	protected siteInfo: SiteInfo
	constructor(siteInfo: SiteInfo) {
		this.siteInfo = siteInfo
	}

	// GENERATION
	////////////////

	async generate() {
		await this.generateConfig()
		await this.generateFiles()

		this._db = new FileDB(this.allFiles)
	}

	protected async generateConfig() {
		this.nestedConfiguration = {}
		const allFiles = readdirSyncRecursive(this.siteInfo.contentDirectory)
		// pass 1: create configuration
		for (let file of allFiles) {
			const fullPath = path.resolve(this.siteInfo.contentDirectory, file)
			const dir = path.dirname(file)
			const ext = path.extname(file).toLocaleLowerCase()
			const name = path.basename(file, path.extname(file))
			let isFrontmatter = false

			let config
			if (ext.toLocaleLowerCase() !== '.toml') {
				config = await streamFrontmatter(fullPath)
				isFrontmatter = true
			} else {
				const contents = fs.readFileSync(
					path.resolve(this.siteInfo.contentDirectory, file),
					'utf-8'
				)

				if (name === `_`) {
					this.nestedConfiguration[dir] = toml.parse(contents)
					continue
				}

				config = toml.parse(contents)
			}

			if (!this.nestedConfiguration[file]) {
				this.nestedConfiguration[file] = config
				continue
			}

			if (isFrontmatter) {
				// frontmatter takes precedence
				this.nestedConfiguration[file] = {
					...this.nestedConfiguration[file],
					...config,
				}
			} else {
				// frontmatter takes precedence
				this.nestedConfiguration[file] = {
					...config,
					...this.nestedConfiguration[file],
				}
			}
		}

		Logger.log(LOG_LEVEL.DEBUG, this.nestedConfiguration)
		return this.nestedConfiguration
	}

	protected async generateFiles() {
		const allFiles = readdirSyncRecursive(this.siteInfo.contentDirectory)
		this.files = {}

		for (let file of allFiles) {
			const ext = path.extname(file).toLocaleLowerCase()
			const rawname = path.basename(file, path.extname(file))

			// hidden files should be ignored
			if (rawname.startsWith('.')) {
				continue
			}

			const tempoString = tempo(rawname)
			const name = tempoString.name

			if (ext.toLocaleLowerCase() === '.toml') {
				continue
			}

			const sourcePath = path.resolve(this.siteInfo.contentDirectory, file)
			const stats = fs.statSync(sourcePath)

			// if the file is totally empty, we ignore it
			if (stats.size === 0) {
				continue
			}

			const config = this.getConfigForFile(file, CONFIG_RECURSION_LEVEL.ALL)

			if (config.private) {
				continue // we ignore private files at a wanderer level.
			}

			const info: FileInfo = {
				configuration: config,
				id: file,
				name,
				ext,
				sourcePath,
				sourceDir: path.dirname(sourcePath),
				created: stats.birthtime,
				updated: stats.mtime,
				date: tempoString.date ?? stats.mtime,
			}

			if (isText(sourcePath, fs.readFileSync(sourcePath))) {
				const pageInfo = info as Page
				pageInfo.text = getTextAfterFrontmatter(sourcePath)
				pageInfo.title = config.title ?? config.name ?? name
				pageInfo.isPage = true
			}
			this.files[file] = info
		}
		return this.files
	}

	// GETTERS
	/////////////

	// id of a file is always the path _relative_ to the content directory
	// and is stored in the id field
	public getConfigForFile(
		fileId: string,
		recursive: CONFIG_RECURSION_LEVEL = CONFIG_RECURSION_LEVEL.ALL
	): PageConfig {
		const parts = fileId.split(path.sep)
		if (recursive === CONFIG_RECURSION_LEVEL.NONE) {
			return this.nestedConfiguration[fileId] ?? {}
		}
		if (recursive === CONFIG_RECURSION_LEVEL.IMMEDIATE_PARENT) {
			parts.pop()

			if (!parts.length) {
				// check the main directory
				if (this.nestedConfiguration['.']) {
					Logger.log(LOG_LEVEL.DEBUG, 'Has a main config!', this.nestedConfiguration['.'])
					return {
						...this.nestedConfiguration['.'],
						...(this.nestedConfiguration[fileId] ?? {}),
					}
				}
				return this.nestedConfiguration[fileId] ?? {}
			}
			Logger.log(LOG_LEVEL.DEBUG, 'Does this have a main config!', this.nestedConfiguration['.'])
			return {
				...(this.nestedConfiguration[parts[parts.length - 1]] ?? {}),
				...(this.nestedConfiguration[fileId] ?? {}),
			}
		}
		if (recursive === CONFIG_RECURSION_LEVEL.ALL) {
			const config = {}
			let currentPath = ''
			if (this.nestedConfiguration['.']) {
				Object.assign(config, this.nestedConfiguration['.'])
			}
			for (let part of parts) {
				currentPath = path.join(currentPath, part)
				Object.assign(config, this.nestedConfiguration[currentPath] ?? {})
			}
			Logger.log(LOG_LEVEL.DEBUG, 'full config', config)
			return config
		}
		return {}
	}

	public get allFiles() {
		const f: FileInfo[] = []
		for (let id in this.files) {
			f.push(this.files[id])
		}
		return f
	}

	public get db() {
		return this._db
	}

	public getFileFromPath(sourcePath: string) {
		const query: QueryOpts = {
			predicates: [
				{
					key: 'sourcePath',
					value: path.resolve(sourcePath),
					modifier: QUERY_MODIFIER_OPERATIONS.EQUALS,
				},
			],
		}

		return this._db.query(query)
	}

	public getFilesWithTitle(title: string) {
		const query: QueryOpts = {
			predicates: [
				{
					key: 'title',
					value: title,
					modifier: QUERY_MODIFIER_OPERATIONS.EQUALS,
				},
				{
					key: 'name',
					value: title,
					modifier: QUERY_MODIFIER_OPERATIONS.EQUALS,
					operator: QUERY_BOOLEAN_OPERATORS.OR,
				},
			],
		}

		return this._db.query(query)
	}

	public getAllFilesWithExts(exts: string[], not?: boolean) {
		const query: QueryOpts = {
			predicates: [],
		}
		for (let ext of exts) {
			if (!query.predicates) {
				query.predicates = []
			}
			query.predicates.push({
				key: 'ext',
				value: ext,
				modifier: QUERY_MODIFIER_OPERATIONS.EQUALS,
				operator: not ? QUERY_BOOLEAN_OPERATORS.NOT : QUERY_BOOLEAN_OPERATORS.OR,
			})
		}
		return this._db.query(query)
	}

	public getFilesWithSimilarNames(file: FileInfo) {
		const name = file.name
		const sourceDir = path.dirname(file.sourcePath)

		const files = this._db.query({
			predicates: [
				{
					key: 'name',
					value: name,
					modifier: QUERY_MODIFIER_OPERATIONS.EQUALS,
				},
				{
					key: 'sourcePath',
					value: sourceDir,
					modifier: QUERY_MODIFIER_OPERATIONS.CONTAINS,
					operator: QUERY_BOOLEAN_OPERATORS.AND,
				},
				{
					key: 'ext',
					value: file.ext,
					modifier: QUERY_MODIFIER_OPERATIONS.EQUALS,
					operator: QUERY_BOOLEAN_OPERATORS.NOT,
				},
			],
		})

		return files ?? []
	}
}
