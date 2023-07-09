export const extractLinks = (markdownText: string) => {
    const regexLinks = /\[(?<text>[^\[]*)\](\((?<link>.*?)\))/gm
    const matches = markdownText.matchAll(regexLinks)
    const links: string[] = []
    if (!matches) {
        return []
    }
    for (let match of matches) {
        if (match.groups?.link) {
            links.push(match.groups.link)
        }
    }

    return links
}