#! /usr/bin/env node

// TODO: needs to be totally rewritten!
const path = require('upath')
const fs = require('fs')

var argv = require('minimist')(process.argv.slice(2))
const wanderer = require('../index')
const pageInfoTool = require('./wanderer/src/lib/page-info')

console.time('build')

if (argv.h || argv.help) {
	console.log(
		`Usage: wanderer -f <frame directory> -i <content directory> -o <out directory> -c <config file>`
	)
	return
}

const frameDir = argv.frame || argv.f || path.resolve(process.cwd(), 'frame')
const contentDir = argv.in || argv.i || path.resolve(process.cwd(), 'content')
const buildDir = argv.out || argv.o || path.resolve(process.cwd(), 'build')
const cacheDir = argv.cache || argv.a || path.resolve(process.cwd(), '.cache')
const configFile = argv.config || argv.c || path.resolve(process.cwd(), 'config.toml')

if (argv.info) {
	try {
		const targetFile = argv.file || argv._[0]
		pageInfoTool(configFile, frameDir, contentDir, path.resolve(targetFile)).then((pageInfo) => {
			console.log(pageInfo)
		})
	} catch (e) {
		console.log(e)
		console.log(
			`Usage: wanderer --info -f <frame directory> -i <content directory> -c <config file> <targetFile>`
		)
	}
	return
}

if (argv.clean) {
	// clean up cache stuff
	try {
		fs.unlinkSync(path.resolve(cacheDir, 'static', 'pages.json'))
	} catch (e) {
		// swallow it
	}

	try {
		fs.unlinkSync(path.resolve(cacheDir, 'pages.json'))
	} catch (e) {
		// swallow it
	}

	try {
		fs.unlinkSync(path.resolve(cacheDir, '.touchfile'))
	} catch (e) {
		// swallow it
	}

	if (fs.existsSync(buildDir)) {
		fs.rmdirSync(buildDir, { recursive: true })
	}
}

wanderer(configFile, frameDir, contentDir, cacheDir, buildDir).then(() => console.timeEnd('build'))
