const esbuild = require('esbuild')

esbuild
	.build({
		entryPoints: ['src/index.ts'],
		bundle: true,
		platform: 'node',
		outfile: 'dist/wanderer-image.js',
	})
	.catch(() => process.exit(1))

esbuild
	.build({
		entryPoints: ['src/index.ts'],
		bundle: true,
		format: 'esm',
		platform: 'node',
		outfile: 'dist/wanderer-image.module.mjs',
	})
	.catch(() => process.exit(1))
