import { SiteInfo } from '@a-morphous/wanderer-types'
import path from 'upath'
export const getRelativeURL = (site: SiteInfo, sourceFileURL: string, targetURL: string) => {
	const newLink = path.relative(
		path.resolve(site.contentDirectory, path.dirname(sourceFileURL)),
		path.resolve(site.contentDirectory, targetURL)
	)

	return newLink
}
