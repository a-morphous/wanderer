import { FileCache } from '@a-morphous/wanderer-types'

type WikilinkResult = {
	target: string
	label: string
}

/**
 *
 * @param wikiLink the string of the link within the `[[]]`
 */
const parseWikiLink = (wikiLink: string): WikilinkResult => {
	let label = wikiLink
	let target = wikiLink
	// display|target format

	const barIndex = wikiLink.indexOf('|')

	if (barIndex !== -1) {
		label = wikiLink.substring(0, barIndex)
		target = wikiLink.substring(barIndex + 1)
	} else {
		// display->target format

		const rightArrIndex = wikiLink.indexOf('->')

		if (rightArrIndex !== -1) {
			label = wikiLink.substring(0, rightArrIndex)
			target = wikiLink.substring(rightArrIndex + 2)
		} else {
			// target<-display format

			const leftArrIndex = wikiLink.indexOf('<-')

			if (leftArrIndex !== -1) {
				label = wikiLink.substring(leftArrIndex + 2)
				target = wikiLink.substring(0, leftArrIndex)
			}
		}
	}
	return {
		label,
		target,
	}
}

export const processAllWikilinks = (text: string, allFiles: FileCache): string => {
	return text.replace(/\[\[(.*?)\]\]/g, (wikilink) => {
		const linkParams = parseWikiLink(wikilink)
		const possibleTargets = allFiles.getFilesWithTitle(linkParams.target)
		if (possibleTargets.length > 1) {
			console.warn(`Multiple files found with title ${linkParams.target}: ${possibleTargets}
            
            Using the first one.`)
		}
		if (!possibleTargets.length) {
			// return link as is
			console.warn(`Wikilink didn't return a valid page with title ${linkParams.target}`)
			return `[${linkParams.label}](${linkParams.target})`
		}

		const page = possibleTargets[0]
        // make this an absolute path
		return `[${linkParams.label}](/${page.url})`
	})
}
