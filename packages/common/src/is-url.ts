// see https://stackoverflow.com/a/49185442
export const isURL = (str: string) => {
	return /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(str)
}
