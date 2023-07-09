import esbuild from "esbuild"
import npmDTS from 'npm-dts';
const { Generator } = npmDTS;

const build = async () => {
	new Generator({
		// relative to tsconfig rootdir
		entry: 'index.ts',
		output: 'dist/index.d.ts',
		logLevel: 'debug',
		force: true,
	}, true).generate()
	await esbuild.build({
		entryPoints: ["src/index.ts"],
		bundle: true,
		target: "es6",
		format: "esm",
		platform: "node",
		external: [
			"@a-morphous/wanderer-plugin-image",
			"@a-morphous/wanderer-plugin-markdown",
			"@a-morphous/wanderer-plugin-copy",
		],
		outfile: "dist/wanderer.js",
		banner: {
			js: `
import { fileURLToPath } from 'url';
import { createRequire as topLevelCreateRequire } from 'module';
const require = topLevelCreateRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
			`,
		},
	})
}

build()
