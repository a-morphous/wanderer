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
	/**
	 * Function that produces a url for the page. Do not include the leading '/'. Include `index.html` if it's an index page.
	 */
	url: (file: FileInfo, site: SiteInfo) => string

	/**
	 * Optional function that produces a page title, used only if the configuration doesn't override the title.
	 * Useful for pulling the title out of a file's contents.
	 */
	title?: (file: FileInfo, site: SiteInfo) => string

	/**
	 * Optional hook that runs before the build step, and can touch all the files in the site.
	 * This can set up local variables, etc.
	 * Doesn't operate on every file, though. Mostly useful for pre-build caching, or for plugins that ignore the build step entirely.
	 */
	beforeBuild?: (opts: PluginOperationOptions) => void

	/**
	 * The plugin's build step, which runs on every file that the plugin should operate on.
	 * By itself, `build` is run without any other modifications; the plugin is responsible for saving output files to the build
	 * directory during this function.
	 * @return {boolean} true if the build succeeded, false if we should error out.
	 */
	build: (opts: PluginBuildOptions, dryRun?: boolean) => boolean

	/**
	 * A global hook that runs after the build step, but is otherwise similar to beforeBuild
	 */
	afterBuild?: (opts: PluginOperationOptions) => void
}
