import { FileInfo, SiteInfo } from '../types'
import path from 'upath'
import fs from 'fs'
import { BasePlugin, PluginBuildOptions, PluginOperationOptions } from './plugins/base-plugin'
import { FileCache } from './pages'
import { FileDB } from './db'
import { readdirSyncRecursive } from '../lib/recursive-readdir'

export class Site {
	protected siteInfo: SiteInfo
	protected fileCache: FileCache
	protected plugins: BasePlugin[] = []

	private usedExtensions: Set<string>

	constructor(config: SiteInfo) {
		this.siteInfo = {
			...config,
			contentDirectory: path.resolve(config.contentDirectory),
			frameDirectory: path.resolve(config.frameDirectory),
			cacheDirectory: path.resolve(config.cacheDirectory),
			buildDirectory: path.resolve(config.buildDirectory),
		}

		this.fileCache = new FileCache(this.siteInfo)
		this.usedExtensions = new Set<string>()
	}

	get contentDir() {
		return this.siteInfo.contentDirectory
	}

	get frameDir() {
		return this.siteInfo.frameDirectory
	}

	get cacheDir() {
		return this.siteInfo.cacheDirectory
	}

	get staticDir() {
		return path.resolve(this.siteInfo.frameDirectory, 'static')
	}

	get buildDir() {
		return this.siteInfo.buildDirectory
	}

	get files() {
		return this.fileCache
	}

	public addPlugin(plugin: BasePlugin) {
		this.plugins.push(plugin)
	}

	public async make() {
		// GENERATE STATICS
		//////////////////////
		// TODO: do this in a plugin instead.
		const staticFiles = readdirSyncRecursive(this.staticDir)
		for (let file of staticFiles) {
			// copy to the the `static` directory in build
			const targetFile = path.resolve(this.buildDir, 'static', file)
			if (!fs.existsSync(path.dirname(targetFile))) {
				fs.mkdirSync(path.dirname(targetFile), { recursive: true })
			}
			fs.copyFileSync(path.resolve(this.staticDir, file), targetFile)
		}

		// BUILD CONTENT
		//////////////////////

		// figure out what the used up extensions are
		await this.fileCache.generate()

		this.usedExtensions.clear()
		for (let plugin of this.plugins) {
			if (plugin.extensions === 'UNUSED') {
				continue
			}
			for (let extension of plugin.extensions) {
				this.usedExtensions.add(extension)
			}
		}

		// top level array corresponds to that plugin
		// and then it's a list of files for the plugin
		const pluginFiles: FileInfo[][] = []
		const allURLs: Record<string, string> = {}

		// now we can figure out all the URLs
		for (let i = 0; i < this.plugins.length; i++) {
			const plugin = this.plugins[i]
			if (plugin.extensions === 'UNUSED') {
				pluginFiles[i] = this.fileCache.getAllFilesWithExts(Array.from(this.usedExtensions), true)
			} else {
				pluginFiles[i] = this.fileCache.getAllFilesWithExts(plugin.extensions)
			}

			// get the url
			for (let j = 0; j < pluginFiles[i].length; j++) {
				const file = pluginFiles[i][j]
				let partialUrl = plugin.url(file, this.siteInfo)
				if (partialUrl.startsWith('/')) {
					partialUrl = partialUrl.slice(1)
				}
				allURLs[file.id] = partialUrl
			}
		}

		// now we run all the plugins!
		for (let i = 0; i < this.plugins.length; i++) {
			const plugin = this.plugins[i]

			// construct all the pluginOpts
			const pluginOpts = {
				site: this.siteInfo,

				database: new FileDB(pluginFiles[i]),
				allFiles: this.fileCache,
				allURLs: allURLs,
			}

			// before build
			if (plugin.beforeBuild) {
				plugin.beforeBuild(pluginOpts)
			}

			// build!
			for (let j = 0; j < pluginFiles[i].length; j++) {
				const file = pluginFiles[i][j]

				const buildOpts: PluginBuildOptions = {
					...pluginOpts,
					file: file,
					url: allURLs[file.id],
				}
				plugin.build(buildOpts)
			}

			// after build
			if (plugin.afterBuild) {
				plugin.afterBuild(pluginOpts)
			}
		}
	}
}