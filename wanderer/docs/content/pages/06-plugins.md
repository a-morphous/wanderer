# Plugins

> NOTE: This page is grossly out of date, and needs to be written, as of 07/25/2022.

All file processing in wanderer is done via plugins. When parsing each file, wanderer takes the list of available plugins, and uses the first one that matches the input extension, and processes the file with that plugin. If nothing matches, wanderer copies over the file as-is.

## Using custom plugins

You can define custom plugins using the site-wide `config.toml` file, by listing them as an array under the `plugins` field.

```
plugins=["wanderer-jsx-to-html"]
```

The plugins are included via a dynamic ES6 `import` relative to the directory you call wanderer from, so you can reference local files, or modules installed in `node_modules/`.

## Creating custom plugins

Plugins are defined as a class with the following interface:

```ts
export interface BasePlugin {
    /**
     * extensions that the plugin works on. `build` is called per file in the plugin
     * use EXTENSIONS_UNUSED to make this plugin work on all files that are not already handled by another plugin (and aren't configuration toml files)
     */
    extensions: string[] | EXTENSIONS_UNUSED;
    /**
     * Function that produces a url for the page. Do not include the leading '/'. Include `index.html` if it's an index page.
     */
    url: (file: FileInfo, site: SiteInfo) => string;
    /**
     * Optional function that produces a page title, used only if the configuration doesn't override the title.
     * Useful for pulling the title out of a file's contents.
     */
    title?: (file: FileInfo, site: SiteInfo) => string;
    /**
     * Optional hook that runs before the build step, and can touch all the files in the site.
     * This can set up local variables, etc.
     * Doesn't operate on every file, though. Mostly useful for pre-build caching, or for plugins that ignore the build step entirely.
     */
    beforeBuild?: (opts: PluginOperationOptions) => void;
    /**
     * The plugin's build step, which runs on every file that the plugin should operate on.
     * By itself, `build` is run without any other modifications; the plugin is responsible for saving output files to the build
     * directory during this function.
     * @return {boolean} true if the build succeeded, false if we should error out.
     */
    build: (opts: PluginBuildOptions, dryRun?: boolean) => boolean;
    /**
     * A global hook that runs after the build step, but is otherwise similar to beforeBuild
     */
    afterBuild?: (opts: PluginOperationOptions) => void;
}
```

## Plugin Lifecycle

Wanderer uses its plugins in the following format way:

1. Run all the plugins' `url()` function, and save every file's url. Do the same with `title()` and each file's title.
2. Run all the plugins' `beforeBuild()` function once, in the order that the plugins were loaded.
3. Run all the plugins' `build()` functions **for every file that matches an extension in that plugin's extension variable**. This function should create the built files for each function.
4. Run all the plugins' `afterBuild()` functions once, in the order that the plugins were loaded.