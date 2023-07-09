# v1.2.0

- Upgrade to ESM Modules, no more require.

# v1.1.1

- Forgot to update builds

# v1.1.0

- Updates the linking scheme so that any relative links to assets and other pages are replaced with absolute links.
- This means that, when linking assets in the contents folder, you are encouraged now to link relatively to the file _also in the contents folder_, and wanderer will automatically parse the link, find the file, and replace the built link with the correct URL
- Adds wikilink support. Using `[[Double Bracket]]` links will link to the page with the same title.

# v1.0.3

- Update the file info's `html` field with the parsed result.

# v1.0.2

- Upgrade template to avoid double-including markdown parser
- micromark -> marked to avoid dependencies

# v1.0.1

- Upgrade template to allow html in parsed templates
- Fix URL scheme to account for special-case indexes

# v1.0.0

- Initial version in typescript
- Switch from homegrown markdown parser to Commonmark compliant one
