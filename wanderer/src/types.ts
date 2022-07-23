/**
 * This gets converted into a TaffyDB query.
 */
export type FeedQuery = {
	directory?: string
	tags?: []
	isAscending?: boolean
	sortBy: string
	limit: number
}

export type Configuration = Record<string, any>

export type SiteConfig = {
	plugins?: string[] // Can either be relative paths (to the base site directory), or names of included npm modules.
} & Configuration

type DirAndPageCommonConfig = {
	private?: boolean
	layout?: string // name of the layout file used to build the page(s)
	feeds?: Record<string, FeedQuery>
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
}

/**
 * Used to refer to a different page without needing the whole page object
 */
export type PageReference = {
	configuration?: Configuration
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
	title?: string // title can have spaces in it, which can also be wikilinked.
	text: string
}

export type Feed = {}
