import { FileInfo, SiteInfo } from '../../types'
import { FileDB } from '../db'
import { FileCache } from '../pages'

export type PluginOperationOptions = {
	site: SiteInfo

	// global stuff, can be used to look at other files.
	allFiles: FileCache
	allURLs: Record<string, string> // id, url
	database: FileDB // note that the database is JUST for the files in the extension
}

export type PluginBuildOptions = PluginOperationOptions & {
	file: FileInfo
	url: string
}

export type EXTENSIONS_UNUSED = 'UNUSED'

export interface BasePlugin {
	/**
	 * extensions that the plugin works on. `build` is called per file in the plugin
	 * use EXTENSIONS_UNUSED to make this plugin work on all files that are not already handled by another plugin (and aren't configuration toml files)
	 */
	extensions: string[] | EXTENSIONS_UNUSED
	url: (file: FileInfo, site: SiteInfo) => string // function that produces a url (starting with /) for the page. Include `index.html` if it's an index page.
	beforeBuild?: (opts: PluginOperationOptions) => void // a function that runs before the build step. This can set up local variables, etc.
	build: (opts: PluginBuildOptions, dryRun?: boolean) => boolean // true for success, false for something went wrong
	afterBuild?: (opts: PluginOperationOptions) => void // a function that runs after the build step. Cleanup, etc.
}
