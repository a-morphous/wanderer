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