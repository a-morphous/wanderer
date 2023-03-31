const { execSync } = require("child_process")
const esbuild = require("esbuild")
const fs = require("fs")
const path = require("path")

esbuild
	.build({
		entryPoints: ["src/index.ts"],
		bundle: true,
		platform: "node",
		external: [
			"@a-morphous/wanderer-plugin-image",
			"@a-morphous/wanderer-plugin-markdown",
			"@a-morphous/wanderer-plugin-copy",
		],
		metafile: true,
		outfile: "dist/wanderer.js",
	})
	.then((result) => {
		fs.writeFileSync(path.resolve(__dirname, "meta.json"), JSON.stringify(result.metafile))
	})
	.catch(() => process.exit(1))

esbuild
	.build({
		entryPoints: ["src/index.ts"],
		bundle: true,
		format: "esm",
		platform: "node",
		external: [
			"@a-morphous/wanderer-plugin-image",
			"@a-morphous/wanderer-plugin-markdown",
			"@a-morphous/wanderer-plugin-copy",
		],
		outfile: "dist/wanderer.module.mjs",
	})
	.catch(() => process.exit(1))

execSync(`pnpm types`)
