# wanderer

an opinionated static site generator written in Typescript.

[Source Code](https://github.com/a-morphous/wanderer)

Is it ready for production use? It's ready in the sense that I personally use it. But it's very much a tool that's made by me, _for_ me, and thus might not be suited to your needs.

## features

- HTML templating, layouts, and partials using JS template strings.
- Write pages in Markdown.
- flat file content structure. Builds the site in the exact structure as the source content, unless you change it.
- image processing via `ImageMagick` to make web-ready images
- as few dependencies as possible - most tools are created as subdirectories, and only uses npm packages that have zero dependencies of their own for text content. (Processing images and media requires more packages)

## notes

- For image compression to work properly, your computer needs both `magick` (Imagemagick) and `pngquant` installed and on the path.

## usage

wanderer is intended to be used on the command line:

```
npm install -g @a-morphous/wanderer

wanderer -i <content folderpath> -f <frame folderpath> -o <build folderpath> -c <config filepath>
```

> If no inputs are provided, wanderer will build in the current directory, assuming that the content lives in `./content`, the frame is in `./frame`, and the build should output to `./build`

If you want to use wanderer in another JS program, you can do so as well:
```
import { wanderer } from '@a-morphous/wanderer'

wanderer({
    buildDirectory: 'path/to/output/dir',
    contentDirectory: 'path/to/content/dir',
    frameDirectory: 'path/to/layouts,
    cacheDirectory: 'path/to/temp/cache',
    siteConfiguration: {}
})
```