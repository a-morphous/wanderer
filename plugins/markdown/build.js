const esbuild = require('esbuild')
const fs = require('fs')
const path = require('path')

esbuild
	.build({
		entryPoints: ['src/index.ts'],
		bundle: true,
        metafile: true,
		minify: false,
		platform: 'node',
		outfile: 'dist/wanderer-markdown.js',
	}).then((result) => {
        fs.writeFileSync(path.resolve(__dirname, 'meta.json'), JSON.stringify(result.metafile))
    })
	.catch(() => process.exit(1))

esbuild
	.build({
		entryPoints: ['src/index.ts'],
		bundle: true,
		format: 'esm',
		minify: false,
		platform: 'node',
		outfile: 'dist/wanderer-markdown.module.mjs',
	})
	.catch(() => process.exit(1))
