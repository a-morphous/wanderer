# Wanderer Preact plugin

Make pages on your Wanderer website using JSX!

## Usage

Install the plugin, then add it to your site's `config.toml`.
Make sure that `htm` and `preact` were also installed!

Now you can add pages using the `.mjs` extension that export _by default_ a Preact component:

```js
import { html } from "htm/preact"

export default Page = (props: PageProps) => {
	return html`<h1>Hello World!</h1>`
}

```