/**
 * Harpe: markdown parser with some extras
 * Except I got rid of the custom parser part because I didn't want to maintain it.
 */

import { micromark } from 'micromark'

export const parse = (input: string): string => {
	const parts = input.split('\n!!!')

	let finalString = ''
	let isInEscapeBlockPointer = false

	for (let part of parts) {
		if (isInEscapeBlockPointer) {
			finalString += `\n${part}`
		} else {
			finalString += micromark(part, 'utf-8', {
                allowDangerousHtml: true
            })
		}
		isInEscapeBlockPointer = !isInEscapeBlockPointer
	}

	return finalString
}
