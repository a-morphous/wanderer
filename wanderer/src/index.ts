import path from 'path'
import { FileCache } from './objects/pages'
import * as url from 'url'
import { FileDB, QUERY_BOOLEAN_OPERATORS, QUERY_MODIFIER_OPERATIONS } from './objects/db'
import { wanderer } from './wanderer'

// @ts-ignore: __filename will be defined in nodejs module settings
const __filename = __filename || url.fileURLToPath(import.meta.url)
// @ts-ignore: __dirname is defined in nodejs module settings.
const __dirname = __dirname || url.fileURLToPath(new URL('.', import.meta.url))

const main = async () => {
	// testing
	const siteConfig = {
		contentDirectory: path.resolve(__dirname, '..', 'test', 'content'),
		frameDirectory: path.resolve(__dirname, '..', 'test', 'frame'),
		buildDirectory: path.resolve(__dirname, '..', 'build', 'test'),
		cacheDirectory: path.resolve(__dirname, '..', 'build', '.cache'),
		siteConfiguration: {},
	}

	wanderer(siteConfig)
}

main()

// export everything
export * from './types'
export * from './objects/site'
export * from './objects/pages'
export * from './objects/db'
export * from './objects/plugins/base-plugin'
export * from './wanderer'