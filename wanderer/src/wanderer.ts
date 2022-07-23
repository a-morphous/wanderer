import { MarkdownPlugin } from '@a-morphous/wanderer-plugin-markdown'
import { ImagePlugin } from '@a-morphous/wanderer-plugin-image'
import { BasePlugin } from './objects/plugins/base-plugin'
import { loadPluginFromString } from './objects/plugins/loader'
import { Site } from './objects/site'
import { SiteInfo } from './types'
import { CopyPlugin } from '@a-morphous/wanderer-plugin-copy'

export const wanderer = async (siteInfo: SiteInfo, plugins?: BasePlugin[]) => {
	const site = new Site(siteInfo)

	let addedPlugins = false
	// add plugins
	if (plugins) {
		for (let plugin of plugins) {
			site.addPlugin(plugin)
			addedPlugins = true
		}
	} else if (siteInfo.siteConfiguration.plugins) {
		for (let pluginPath of siteInfo.siteConfiguration.plugins) {
			const plugin = await loadPluginFromString(pluginPath)
			if (plugin) {
				site.addPlugin(plugin)
				addedPlugins = true
			}
		}
	}

	if (!addedPlugins) {
		// add the default plugins
        site.addPlugin(new ImagePlugin())
		site.addPlugin(new MarkdownPlugin())
		site.addPlugin(new CopyPlugin() as BasePlugin)
	}

    await site.make()
}
