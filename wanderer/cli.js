#! /usr/bin/env node

// TODO: needs to be totally rewritten!
const path = require('upath')
const fs = require('fs')
const toml = require('@iarna/toml')

var argv = require('minimist')(process.argv.slice(2))
const { wanderer } = require('./dist/wanderer')

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

let siteConfig = {}

if (argv.clean) {
	// clean up cache stuff
	try {
		fs.rmdirSync(path.resolve(cacheDir), { recursive: true })
	} catch (e) {
		// swallow it
	}

	if (fs.existsSync(buildDir)) {
		fs.rmdirSync(path.resolve(buildDir), { recursive: true })
	}
}


if (fs.existsSync(configFile)) {
	siteConfig = toml.parse(fs.readFileSync(configFile, 'utf-8'))
}

const siteInfo = {
	siteConfiguration: siteConfig,
	contentDirectory: contentDir,
	frameDirectory: frameDir,
	buildDirectory: buildDir,
	cacheDirectory: cacheDir,
}


wanderer(siteInfo).then(() => console.timeEnd('build'))
