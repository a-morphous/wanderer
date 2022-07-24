import { BasePlugin, FileInfo, PluginBuildOptions, SiteInfo } from '@a-morphous/wanderer-types'
import path from 'upath'
import fs from 'fs'
import dayjs from 'dayjs'
import { processImage } from './processor'

export class ImagePlugin implements BasePlugin {
	public extensions = ['.png', '.jpg', '.jpeg']
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
	build(opts: PluginBuildOptions, dryRun?: boolean) {
		const cache = opts.site.cacheDirectory
		const cacheFilePath = path.resolve(cache, opts.url)
		const targetPath = path.resolve(opts.site.buildDirectory, opts.url)

		if (fs.existsSync(cacheFilePath)) {
			const cacheUpdatedTime = fs.statSync(cacheFilePath).mtime
			if (dayjs(opts.file.updated).isBefore(cacheUpdatedTime)) {
				// the cache is newer than the image, we can just use the cache image
				if (dryRun) {
					console.log(`retrieving ${opts.file.name} from the cache at ${cacheFilePath}`)
					return true
				}
				if (path.resolve(cacheFilePath) !== path.resolve(targetPath)) {
					if (!fs.existsSync(path.dirname(targetPath))) {
						fs.mkdirSync(path.dirname(targetPath), { recursive: true })
					}
					fs.copyFileSync(cacheFilePath, targetPath)
				}
				return true
			}
		}

		// we need to recreate the cached image
		processImage(opts.file.sourcePath, cacheFilePath).then(() => {
			if (dryRun) {
				console.log(`building ${opts.file.name} at ${targetPath}`)
				return true
			}
			if (path.resolve(cacheFilePath) !== path.resolve(targetPath)) {
				if (!fs.existsSync(path.dirname(targetPath))) {
					fs.mkdirSync(path.dirname(targetPath), { recursive: true })
				}
				fs.copyFileSync(cacheFilePath, targetPath)
			}
		})
		return true
	}
}
