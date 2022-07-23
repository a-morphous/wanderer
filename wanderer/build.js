const { execSync } = require('child_process')
const esbuild = require('esbuild')

esbuild
	.build({
		entryPoints: ['src/index.ts'],
		bundle: true,
		platform: 'node',
		outfile: 'dist/wanderer.js',
	})
	.catch(() => process.exit(1))

esbuild
	.build({
		entryPoints: ['src/index.ts'],
		bundle: true,
		format: 'esm',
		platform: 'node',
		outfile: 'dist/wanderer.module.mjs',
	})
	.catch(() => process.exit(1))

execSync(`pnpm types`)
