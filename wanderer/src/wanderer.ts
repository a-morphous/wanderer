import MarkdownPlugin from '@a-morphous/wanderer-plugin-markdown'
import ImagePlugin from '@a-morphous/wanderer-plugin-image'
import { BasePlugin } from './objects/plugins/base-plugin'
import { loadPluginFromString } from './objects/plugins/loader'
import { Site } from './objects/site'
import { SiteInfo } from './types'
import CopyPlugin from '@a-morphous/wanderer-plugin-copy'

export const wanderer = async (
	siteInfo: SiteInfo,
	useDefaultPlugins: boolean = true,
	plugins?: BasePlugin[]
) => {
	const site = new Site(siteInfo)

	if (useDefaultPlugins) {
		// add image and markdown plugins immediately
		site.addPlugin(new ImagePlugin())
		site.addPlugin(new MarkdownPlugin())
	}

	// add plugins
	if (plugins) {
		for (let plugin of plugins) {
			site.addPlugin(plugin)
		}
	} else if (siteInfo.siteConfiguration.plugins) {
		for (let pluginPath of siteInfo.siteConfiguration.plugins) {
			const plugin = await loadPluginFromString(pluginPath)
			if (plugin) {
				site.addPlugin(plugin)
			}
		}
	}

	if (useDefaultPlugins) {
		// add the copy plugin last
		site.addPlugin(new CopyPlugin() as BasePlugin)
	}

	await site.make()
}
