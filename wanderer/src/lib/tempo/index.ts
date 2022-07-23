const getMonthNumber = (s) => s.toLowerCase().charCodeAt(0) - 97

export const isTempoString = (string) => {
	return /^[0-9][0-9][a-l][0-9]?[0-9]$/.test(string)
}

const parseDate = (tempoString) => {
	// validate tempoString
	if (!isTempoString(tempoString)) {
		throw new Error('invalid tempo string format.')
	}

	const year = parseInt(tempoString.slice(0, 2), 10)
	const month = getMonthNumber(tempoString[2])
	const day = parseInt(tempoString.slice(3), 10)

	return new Date(2000 + year, month, day)
}

export const tempo = (filename) => {
	let tempoString = undefined
	let processedFilename = filename
	let date: Date | undefined

	const possibleDateTokens = filename.split('-')
	const possibleDateString = possibleDateTokens.shift()
	if (isTempoString(possibleDateString)) {
		tempoString = possibleDateString
		date = parseDate(tempoString)
		processedFilename = possibleDateTokens.join('-')
	} else if (/^[0-9]+$/g.test(possibleDateString) && possibleDateTokens.length > 0) {
		processedFilename = possibleDateTokens.join('-')
	}

	return { tempo: tempoString, date: date, name: processedFilename }
}
