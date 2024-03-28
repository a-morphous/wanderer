import path from 'path'
import fs from 'fs'
import type {
	FileInfo,
	IFileCache,
	IFileDB,
	PageReference,
	QueryOpts,
	SiteInfo,
} from '@a-morphous/wanderer'

/**
 * genLayout - produces layout text based on input configuration
 * @returns layoutText - string with the layout that can be processed with template.
 */
export const genLayout = (siteInfo: SiteInfo, file: FileInfo) => {
	// find the layout
	const layout = file.configuration?.layout || 'default'

	const layoutPath = path.resolve(siteInfo.frameDirectory, 'layouts', layout + '.html')
	let layoutText = '${o.content}'
	if (fs.existsSync(layoutPath)) {
		layoutText = fs
			.readFileSync(path.resolve(siteInfo.frameDirectory, 'layouts', layout + '.html'))
			.toString()
	}

	return layoutText
}

type PageStatics = {
	css?: FileInfo
	js?: FileInfo
	statics: FileInfo[]
}

/**
 * genPageStatics - creates a file that contains static files associated with the page.
 * static files are files that have the same name as a content file.
 * @returns pageStatics {
 *  css: path to css file
 *  js: path to js file
 *  statics: [list of other static files]
 * }
 */
export const genPageStatics = (file: FileInfo, allFiles: IFileCache) => {
	// figure out if we should add css / js files
	const possiblePageStatics = allFiles.getFilesWithSimilarNames(file)
	const staticObj: PageStatics = {
		statics: [],
	}

	for (let staticFile of possiblePageStatics) {
		if (staticFile.ext === '.css') {
			staticObj.css = staticFile
		} else if (staticFile.ext === '.js') {
			staticObj.js = staticFile
		} else {
			staticObj.statics.push(staticFile)
		}
	}

	return staticObj
}

/**
 * genFeeds - creates feeds that can be used in layouts in content pages
 */
export const genFeeds = (file: FileInfo, filePool: IFileDB, allURLs: Record<string, string>) => {
	// generate all of the feeds
	//////////////////////////////
	const feeds: Record<string, FileInfo[]> = {}
	const referenceFeeds: Record<string, PageReference[]> = {}
	if (file.configuration?.feeds) {
		for (let feedName of Object.keys(file.configuration.feeds)) {
			const feed = file.configuration.feeds[feedName]
			// if the feed query is a string, we need to generate a query from it
			const rawQuery = feed.query
			let query: QueryOpts = {}

			query.sortBy = feed.sortBy
			query.isAscending = feed.isAscending
			query.limit = feed.limit

			if (typeof rawQuery === 'string') {
				// DIRECTORY QUERY
				// if the query is clearly a directory, or explicitly calls itself one
				// then go directly to querying directories
				if (rawQuery.startsWith('.')) {
					const directory = path.resolve(file.sourceDir, rawQuery)
					feeds[feedName] = filePool.queryDirectory(directory, query, false)
					continue
				}
				if (rawQuery.toLocaleLowerCase().startsWith('dir:')) {
					const directory = path.resolve(file.sourceDir, rawQuery.slice(4))
					feeds[feedName] = filePool.queryDirectory(directory, query, false)
					continue
				}

				// TAG QUERY

				// MISC STRING QUERY
				query.rawQuery = rawQuery
			} else if (Array.isArray(rawQuery)) {
				query.predicates = rawQuery
			} else {
				query.predicates = [rawQuery]
			}

			feeds[feedName] = filePool.query(query)
		}
	}

	// convert all the feeds to pageReferences.
	for (let feedName in feeds) {
		const rawFeed = feeds[feedName]
		referenceFeeds[feedName] = []

		for (let feedFile of rawFeed) {
			referenceFeeds[feedName].push(genPageReference(feedFile, filePool, allURLs))
		}
	}

	return referenceFeeds
}

export const genPageReference = (
	file: FileInfo,
	filePool: IFileDB,
	allURLs: Record<string, string>,
	existingFeed?: FileInfo[]
) => {
	const pageReference: PageReference = {
		id: file.id,
		title: file.title ?? file.name, //TODO: actual method to get the title
		url: '/' + allURLs[file.id],
		sourceName: path.basename(file.sourcePath), // filename before we did any processing
		created: file.created,
		updated: file.updated,
		date: file.date,
		configuration: file.configuration,
	}

	// generate previous and next pages
	if (existingFeed) {
		const currentIndex = existingFeed.indexOf(file)
		if (currentIndex > 0) {
			pageReference.previousPage = genPageReference(
				existingFeed[currentIndex - 1],
				filePool,
				allURLs
			)
		}
		if (currentIndex >= 0 && currentIndex < existingFeed.length - 1) {
			pageReference.nextPage = genPageReference(existingFeed[currentIndex + 1], filePool, allURLs)
		}
	}

	return pageReference
}
