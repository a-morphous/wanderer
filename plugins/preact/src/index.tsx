import type {
	BasePlugin,
	FileInfo,
	Page,
	PageReference,
	PluginBuildOptions,
	QUERY_BOOLEAN_OPERATORS,
	QUERY_MODIFIER_OPERATIONS,
	SiteInfo,
} from '@a-morphous/wanderer'
import { PluginOperationOptions } from '@a-morphous/wanderer/index';
import path from 'path'
import fs from 'fs'
import { render } from '@a-morphous/wanderer-template'
import { defaultUrl } from "@a-morphous/wanderer-plugins-common/src/url"
import { defaultTitle } from "@a-morphous/wanderer-plugins-common/src/title"
import { genFeeds, genLayout, genPageReference, genPageStatics } from "@a-morphous/wanderer-plugins-common/src/gen"
import { getRelativeURL } from "@a-morphous/wanderer-plugins-common/src/get-relative-url"
import { html as h } from 'htm/preact';
import { render as renderHTML } from 'preact-render-to-string';

export type PageProps = {
	css?: string,
	js?: string,
	next?: PageReference,
	previous?: PageReference,
	feeds?: Record<string, PageReference[]>,
	_baseDir: string
}

export default class ReactPlugin implements BasePlugin {
	public extensions: string[] = ['.mjs']
	url(file: FileInfo, site: SiteInfo) {
		return defaultUrl(file, site)
	}

	title(file: FileInfo, site: SiteInfo) {
		return defaultTitle(file, site)
	}
	beforeBuild?: (opts: PluginOperationOptions) => void;
	async build (opts: PluginBuildOptions, dryRun?: boolean): Promise<boolean> {
		const file = opts.file as Page

		const layoutText = genLayout(opts.site, file)

		// figure out if we should add css / js files
		const pageStatics = genPageStatics(file, opts.allFiles)
		const feeds = genFeeds(file, opts.database, opts.allURLs)

		// parse and generate the template
		////////////////////////////////////

		// since files may have moved while being built, we need to update _relative_ links to point
		// to the proper file in the destination directory.
	 	//let text = file.text

		const ReactPage = await import(file.sourcePath);

		const pageStaticsURL: { css?: string; js?: string } = {}
		if (pageStatics.css) {
			pageStaticsURL.css = getRelativeURL(
				opts.site,
				opts.url,
				opts.allURLs[pageStatics.css.id] ?? pageStatics.css.id
			)
		}
		if (pageStatics.js) {
			pageStaticsURL.js = getRelativeURL(
				opts.site,
				opts.url,
				opts.allURLs[pageStatics.js.id] ?? pageStatics.js.id
			)
		}

		const pageReference = genPageReference(
			opts.file,
			opts.database,
			opts.allURLs,
			opts.database.queryDirectory(opts.file.sourceDir, {
				predicates: [
					{
						key: 'name',
						value: 'index',
						operator: 'NOT' as QUERY_BOOLEAN_OPERATORS,
						modifier: '=' as QUERY_MODIFIER_OPERATIONS,
					},
					{
						key: 'name',
						value: '404',
						operator: 'NOT' as QUERY_BOOLEAN_OPERATORS,
						modifier: '=' as QUERY_MODIFIER_OPERATIONS,
					},
				],
			})
		)

		const props: PageProps = {
			// adds page-specific css and js
			...pageStaticsURL,
			next: pageReference.nextPage,
			previous: pageReference.previousPage,
			feeds,
			_baseDir: opts.site.frameDirectory,
		}

		// now we parse the text into HTML.
		const html = renderHTML(h`<${ReactPage.default} ...${props}/>`)

		const templateVars = {
			...props,
			content: html,
			...file,
			// adds anything from the frontmatter + folder config at top-level
			...file.configuration,
		}

		// second html pass: add layouts and additional partials to the content
		const templatedHTML = render(layoutText, templateVars)
		const targetPath = path.resolve(opts.site.buildDirectory, opts.url)
		if (dryRun) {
			console.log(opts)
			console.log(`React plugin running, to save ${targetPath}`)
			return true
		}
		if (!fs.existsSync(targetPath)) {
			fs.mkdirSync(path.dirname(targetPath), { recursive: true })
		}
		fs.writeFileSync(targetPath, templatedHTML)
		file.html = html

		return true
	}
	afterBuild?: (opts: PluginOperationOptions) => void;

}