import { FileInfo, Page, SiteInfo } from "@a-morphous/wanderer"

export const defaultTitle = (file: FileInfo, site: SiteInfo) => {
	const page = file as Page
	let title = ''
	if (page.text.trimStart().startsWith('#')) {
		title = page.text
			.trim()
			.split(/\r\n|\r|\n/g)[0]
			.slice(2)
			.trim()
	}

	return file.configuration?.title || title || file.name
}