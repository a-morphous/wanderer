/**
 * Harpe: markdown parser with some extras
 * Except I got rid of the custom parser part because I didn't want to maintain it.
 */

import { micromark } from 'micromark'

const escapeHTML = (text) => {
	// escape $ is necessary since otherwise ${} inside a code tag will turn into a template literal
	return text
		.replace(/\&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/\$/g, '\\$')
}

export const parse = (input: string): string => {
	// escape $ inside of code tags otherwise we'll risk recursing forever
	let preparseTextPieces: string[] = []
	const codeParts = input.split('\n```')
	let isInCode = false
	for (let part of codeParts) {
		if (!isInCode) {
			preparseTextPieces.push(part)
		} else {
			preparseTextPieces.push(escapeHTML(part))
		}
        isInCode = !isInCode
	}

	const parts = preparseTextPieces.join('\n```').split('\n!!!')

	let finalString = ''
	let isInEscapeBlockPointer = false

	for (let part of parts) {
		if (isInEscapeBlockPointer) {
			finalString += `\n${part}`
		} else {
			finalString += micromark(part, 'utf-8', {
				allowDangerousHtml: true,
			})
		}
		isInEscapeBlockPointer = !isInEscapeBlockPointer
	}

	return finalString
}
