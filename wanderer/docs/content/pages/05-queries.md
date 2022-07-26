# Queries in Wanderer

wanderer builds the site page by page, but this can fall apart in the case of blog indices. Thus, there's also a capability of creating various `feeds` that can be used to list out pages.

## Defining feeds in config

Feeds are defined under the `feeds` header in page level configurations:

```
[feeds.feedName]
query = [{ key="configuration.tags", value="logs", modifier="CONTAINS" }]
isAscending = true
limit = 10
sortBy = "date"
```

* if the feedName is a string, we assume that the feed should be made of the files whose **source directories** fall under that string
* if the feedName is a dict, we search the database for pages that match the query object. The queries use `JSONata` as the underlying query language, and the `feed` dict takes the following fields:
    * `query` - either an array of conditions, or a raw JSONata string operating on the main file database.
    * `isAscending` - boolean
    * `limit` - how many pages are in the result
    * `sortBy`

All feeds are also fed into the templates as `o.feeds.feedName`, and can then be used in content:

```
# Blog posts

${o.feeds.feedName.map(item => {
    return `# ${item.title}
    ${item.description}`
}).join('')}
```

[Reference](https://benfrain.com/html-templating-with-vanilla-javascript-es2015-template-literals/#h-H2_2)

Note the `join` at the end. Without it, the map would be interpreted as an array, and will render with comma separators.

## Objects in a feed

```
{
    config: {}
    id: pageID
    url: absolute/link/to/page
    title: page title
    exerpt: a short excerpt (also defined in config.exerpt)
    content: full page content (be aware that nested template features won't work right)
}
```
