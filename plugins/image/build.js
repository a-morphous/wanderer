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
		outfile: "dist/wanderer-image.js",
	})
}

build()

