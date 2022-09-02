# v1.2.0

- Updates the linking scheme so that any relative links to assets and other pages are replaced with absolute links.
- This means that, when linking assets in the contents folder, you are encouraged now to link relatively to the file _also in the contents folder_, and wanderer will automatically parse the link, find the file, and replace the built link with the correct URL
- Adds wikilink support. Using `[[Double Bracket]]` links will link to the page with the same title.
- Slugifies pages and files. This ensures that they will render nicely as urls, but may break existing links.

# v1.1.4

- Ensures all `beforeBuild` functions run before _any_ `build` functions, and that `afterBuild` runs after all `build` functions. This allows plugins, in `afterBuild`, to also examine the HTML content of a page.

# v1.1.3

- Plugins are default exports now
- Fix bug where returning a blank string for the url in a plugin would error out, instead of ignoring that url (even if the plugin didn't work on any extensions)

# v1.1.2

- micromark -> marked in plugins, new build
- Remove plugins from peerDependencies; if you just use the built wanderer-core, those dependencies aren't needed.

# v1.1.1

- Included changes from `markdown` and `template` to allow HTML in Markdown templates, and fix `index.html` in Markdown's URLs.

# v1.1.0

- Fix issue where `index` files would end up overwriting each other, instead of sticking with the correct dir they were a part of
- Add ability of markdown plugin to generate titles for files
- Fix issue with image plugin where the script could fail if the build directory didn't already exist

# v1.0.0

- Rewrote wanderer in typescript
- Use pnpm to split out plugins and different pieces into different packages
