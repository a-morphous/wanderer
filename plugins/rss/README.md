# Wanderer RSS Feed Plugin

Generates an RSS feed out of whatever feed you create from your site.

## Usage

In your site configuration, add this plugin to your plugins list:

```toml
# config.toml

plugins=["@a-morphous/wanderer-plugin-rss", ...]
```

and then add your feed configuration to the site configuration as well. You do this by setting the `rss` object in the configuration. See https://www.npmjs.com/package/feed for a full list of configuration options.

```toml
# config.toml

[rss]
title = "Feed Title"
description = "Feed description"
url = "http://localhost:8080" # please add your actual URL here, without a trailing /
author = "Name of Author"
email = "author email address"
language = "en" # english by default, set your own locale code if not
image = "link/to/image/file"
favicon = "link/to/favicon.ico"
```

Then, finally, you need a **query** to determine which items to put into the feed:

```toml
[rss.feed]
query = [{ key="configuration.tags", value="blog", modifier="CONTAINS" }]
isAscending = true
limit = 10
sortBy = "date"
```

The feed has the following parameters (which is the same as feeds used elsewhere in Wanderer:)

- `query`: an array with query operation objects. Each operation checks whether a key matches the modifier for a value, where the modifier can be `=`, `<=` `<`, `>=`, `>`, `!=`, `CONTAINS`, `IN`, or `EXISTS`.
  - `IN` is used to determine if the value is part of a string
  - `EXISTS` is used to determine if the key exists, and the value is discarded
  - `CONTAINS` is used to determine if the value is contained within an array
- If there is more than one operation in the query, each of them also needs an `operator`:

```
query=[{ key="configuration.tags", value="blog", modifier="CONTAINS", operator="AND" }, { key="configuration.tags", value="test", modifier="CONTAINS", operator="NOT" }]
```

- Operators determine how the query operations are joined together. There are three choices, `AND`, `OR`, and `NOT`. They are always operated directly from left to right.

The feed will then operate on every file in the site that matches the query.

## Which items get syndicated?

However, even after you make your feed, not every item might end up in the feed.

The reason is that **only pages that are eventually rendered into HTML are turned into feed items**. This is to prevent things like CSS and JS files from getting syndicated.
