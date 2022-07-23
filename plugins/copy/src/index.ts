import fs from 'fs'
import path from 'upath'
import { BasePlugin, FileInfo, PluginBuildOptions, SiteInfo } from '@a-morphous/wanderer-types'

// simply copies the source file to target directory.
// this parser is used if no extensions match.
export class CopyPlugin implements BasePlugin {
	public extensions = 'UNUSED' as const
	url(fileInfo: FileInfo, site: SiteInfo): string {
		return fileInfo.id
	}
	build(opts: PluginBuildOptions) {
		const targetFilePath = path.resolve(opts.site.buildDirectory, opts.url)
		const sourceFilePath = path.resolve(opts.file.sourcePath)
		fs.copyFileSync(sourceFilePath, targetFilePath)

		return true
	}
}