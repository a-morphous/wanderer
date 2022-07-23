import path from 'upath'
import { BasePlugin } from './base-plugin'

export const loadPluginFromString = async (pluginPath: string, baseDir?: string) => {
	try {
		if (pluginPath.startsWith('.')) {
			// relative path. Should resolve from where wanderer is called
			pluginPath = path.resolve(baseDir || process.cwd(), pluginPath)
		}
		const PluginClass = await import(pluginPath)
		const plugin: BasePlugin = new PluginClass()
		if (!plugin.build || !plugin.extensions) {
			console.warn('wanderer plugin in path ' + pluginPath + ' was invalid')
			return undefined
		}
		return plugin
	} catch (e) {
		console.log('Error trying to load plugin at path ' + pluginPath)
		console.log(e)
	}
}
