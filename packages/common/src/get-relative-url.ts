import type { SiteInfo } from '@a-morphous/wanderer'
import path from 'path'
export const getRelativeURL = (site: SiteInfo, sourceFileURL: string, targetURL: string) => {
	const newLink = path.relative(
		path.resolve(site.contentDirectory, path.dirname(sourceFileURL)),
		path.resolve(site.contentDirectory, targetURL)
	)

	return newLink
}
