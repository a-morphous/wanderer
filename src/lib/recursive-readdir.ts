import fs from 'fs'
import path from 'path'

const _readdirSyncRecursive = function(
	dirPath: string,
	_originalDirPath?: string,
	arrayOfFiles: string[] = []
) {
	const files = fs.readdirSync(dirPath)

	const originalDirPath = _originalDirPath || dirPath

	files.forEach(function(file) {
		if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
			arrayOfFiles = _readdirSyncRecursive(path.join(dirPath, file), originalDirPath, arrayOfFiles)
		} else {
			arrayOfFiles.push(path.normalize(path.relative(originalDirPath, path.join(dirPath, file))))
		}
	})

	return arrayOfFiles
}

/**
 * Returns a list of files, as strings with paths relative to the source directory
 * @param dirPath 
 * @returns 
 */
export const readdirSyncRecursive = function(sourceDirectory: string): string[] {
	return _readdirSyncRecursive(sourceDirectory)
}
