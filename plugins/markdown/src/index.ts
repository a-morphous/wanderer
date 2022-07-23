import path from 'upath'
import fs from 'fs'
import { genFeeds, genLayout, genPageReference, genPageStatics } from './gen'
import template from '@a-morphous/wanderer-template'
import {
	BasePlugin,
	FileInfo,
	Page,
	PluginBuildOptions,
	QUERY_BOOLEAN_OPERATORS,
	QUERY_MODIFIER_OPERATIONS,
	SiteInfo,
} from '@a-morphous/wanderer-types'
import { parse } from './harpe'
import extractLinks from 'markdown-link-extractor'
import { isURL } from './utils/is-url'
import { getRelativeURL } from './utils/get-relative-url'

export class MarkdownPlugin implements BasePlugin {
	public extensions: string[] = ['.md', '.markdown']
	url(file: FileInfo, site: SiteInfo) {
		let relativeDir: string
		if (file.configuration?.dir) {
			const resolvedDir = path.resolve(site.contentDirectory, file.configuration.dir)
			relativeDir = path.relative(site.contentDirectory, resolvedDir)
		} else {
			relativeDir = path.relative(site.contentDirectory, file.sourceDir)
		}

		const urlPiece = relativeDir + path.sep + file.name

		if (['404', 'index'].includes(file.name)) {
			// no pretty printing needed
			return urlPiece + '.html'
		}

		// time to pretty print!
		return urlPiece + path.sep + 'index.html'
	}
	build(opts: PluginBuildOptions, dryRun: boolean = false) {
		const file = opts.file as Page

		const layoutText = genLayout(opts.site, file)

		// figure out if we should add css / js files
		const pageStatics = genPageStatics(file, opts.allFiles)
		const feeds = genFeeds(file, opts.database, opts.allURLs)

		// parse and generate the template
		////////////////////////////////////

		// since files may have moved while being built, we need to update _relative_ links to point
		// to the proper file in the destination directory.
		const links = extractLinks(file.text)
		let text = file.text
		for (let link of links) {
			if (isURL(link)) {
				continue
			}
			let linkSourcePath = path.resolve(opts.file.sourceDir, link)
			if (link.startsWith('/')) {
				linkSourcePath = path.resolve(opts.site.contentDirectory, link.slice(1))
			}

			const file = opts.allFiles.getFileFromPath(linkSourcePath)[0]
			if (!file) {
				continue
			}
			const newURL = opts.allURLs[file.id]
			const newLink = getRelativeURL(opts.site, opts.url, newURL)

			if (link !== newLink) {
				text = text.replace(link, newLink)
			}
		}

		// now we parse the text into HTML.

		const html = parse(text)

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

		const templateVars = {
			// adds page-specific css and js
			...pageStaticsURL,
			...file,
			// adds anything from the frontmatter + folder config at top-level
			...file.configuration,
			feeds,
			content: html,
			_baseDir: opts.site.frameDirectory,
			next: pageReference.nextPage,
			previous: pageReference.previousPage,
		}

		// second html pass: add layouts and additional partials to the content
		const templatedHTML = template(layoutText, templateVars)
		const targetPath = path.resolve(opts.site.buildDirectory, opts.url)
		if (dryRun) {
			console.log(opts)
			console.log(`Markdown plugin running, to save ${targetPath}`)
			return true
		}
		if (!fs.existsSync(targetPath)) {
			fs.mkdirSync(path.dirname(targetPath), { recursive: true })
		}
		fs.writeFileSync(targetPath, templatedHTML)

		return true
	}
}