const esbuild = require('esbuild')

esbuild
	.build({
		entryPoints: ['src/index.ts'],
		bundle: true,
		platform: 'node',
		outfile: 'dist/wanderer-markdown.js',
	})
	.catch(() => process.exit(1))

esbuild
	.build({
		entryPoints: ['src/index.ts'],
		bundle: true,
		format: 'esm',
		platform: 'node',
		outfile: 'dist/wanderer-markdown.module.mjs',
	})
	.catch(() => process.exit(1))
