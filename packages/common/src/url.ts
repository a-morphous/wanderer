import { FileInfo, SiteInfo } from "@a-morphous/wanderer"
import path from "path"

export const defaultUrl = (file: FileInfo, site: SiteInfo) => {
	let relativeDir: string
	if (file.configuration?.dir) {
		const resolvedDir = path.resolve(site.contentDirectory, file.configuration.dir)
		relativeDir = path.relative(site.contentDirectory, resolvedDir)
	} else {
		relativeDir = path.relative(site.contentDirectory, file.sourceDir)
	}

	let urlPiece = relativeDir + path.sep + file.name
	if (file.name === 'index') {
		// we need to get the upper level directory anyway...
		const pathSplit = file.id.split(path.sep)
		if (pathSplit.length > 1) {
			const targetDir = pathSplit[pathSplit.length - 2]
			const relativeSplit = relativeDir.split(path.sep)

			// SPECIAL CASE: if the file is index and the `dir` configuration points to the
			// same directory as above, we don't create a second copy of that directory.
			if (targetDir !== relativeSplit[relativeSplit.length - 1]) {
				urlPiece = relativeDir + path.sep + targetDir + path.sep + 'index'
			}
		}
	}

	if (['404', 'index'].includes(file.name)) {
		// no pretty printing needed
		return urlPiece + '.html'
	}

	// time to pretty print!
	return urlPiece + path.sep + 'index.html'
}