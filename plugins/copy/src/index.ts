import fs from 'fs'
import path from 'upath'
import { BasePlugin, FileInfo, PluginBuildOptions, SiteInfo } from '@a-morphous/wanderer-types'

// simply copies the source file to target directory.
// this parser is used if no extensions match.
export default class CopyPlugin implements BasePlugin {
	public extensions = 'UNUSED' as const
	url(file: FileInfo, site: SiteInfo) {
		let relativeDir: string
		if (file.configuration?.dir) {
			const resolvedDir = path.resolve(site.contentDirectory, file.configuration.dir)
			relativeDir = path.relative(site.contentDirectory, resolvedDir)
		} else {
			relativeDir = path.relative(site.contentDirectory, file.sourceDir)
		}

		const urlPiece = relativeDir + path.sep + file.name
		return urlPiece + file.ext
	}
	build(opts: PluginBuildOptions) {
		const targetFilePath = path.resolve(opts.site.buildDirectory, opts.url)
		const sourceFilePath = path.resolve(opts.file.sourcePath)
        if (!fs.existsSync(path.dirname(targetFilePath))) {
            fs.mkdirSync(path.dirname(targetFilePath), { recursive: true })
        }
		fs.copyFileSync(sourceFilePath, targetFilePath)

		return true
	}
}
