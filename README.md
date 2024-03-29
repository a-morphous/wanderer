# wanderer

an opinionated static site generator written in Typescript.

[Source Code](https://github.com/a-morphous/wanderer)

Is it ready for production use? It's ready in the sense that I personally use it. But it's very much a tool that's made by me, _for_ me, and thus might not be suited to your needs.

## features

- HTML templating, layouts, and partials using JS template strings.
- Write pages in Markdown.
- flat file content structure. Builds the site in the exact structure as the source content, unless you change it.
- image processing via `Graphicsmagick` to make web-ready images
- as few dependencies as possible - most tools are created as subdirectories, and only uses npm packages that have zero dependencies of their own for text content. (Processing images and media requires more packages)

## notes

- For image compression to work properly, your computer needs both `gm` (Graphicsmagick) and `pngquant` installed and on the path.

## usage

This is a monorepo managed by `pnpm`. The main wanderer program is in the `wanderer` subdirectory, with some default plugins in the `plugins` directory. To use wanderer, first run `pnpm install` to install all dependencies, and then run:

```
# assuming your terminal is in the wanderer monorepo directory
node wanderer/cli -i <content folderpath> -f <frame folderpath> -o <build folderpath> -c <config filepath>
```

> If no inputs are provided, wanderer will build in the current directory, assuming that the content lives in `./content`, the frame is in `./frame`, and the build should output to `./build`
