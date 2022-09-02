
/**
 * Slugifies a filename
 * @param str 
 * @param separator 
 * @returns 
 */
export const slugify = (str: string) => {
	return str
		.toLowerCase()
		.trim()
		.replace(/[^\.\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '')
}
