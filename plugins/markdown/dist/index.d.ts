declare module '@a-morphous/wanderer-plugin-markdown/gen' {
  import type { FileInfo, IFileCache, IFileDB, PageReference, SiteInfo } from '@a-morphous/wanderer';
  export const genLayout: (siteInfo: SiteInfo, file: FileInfo) => string;
  type PageStatics = {
      css?: FileInfo;
      js?: FileInfo;
      statics: FileInfo[];
  };
  export const genPageStatics: (file: FileInfo, allFiles: IFileCache) => PageStatics;
  export const genFeeds: (file: FileInfo, filePool: IFileDB, allURLs: Record<string, string>) => Record<string, PageReference[]>;
  export const genPageReference: (file: FileInfo, filePool: IFileDB, allURLs: Record<string, string>, existingFeed?: FileInfo[]) => PageReference;
  export {};

}
declare module '@a-morphous/wanderer-plugin-markdown/harpe' {
  export const parse: (input: string) => string;

}
declare module '@a-morphous/wanderer-plugin-markdown/index' {
  import type { BasePlugin, FileInfo, PluginBuildOptions, SiteInfo } from '@a-morphous/wanderer';
  export default class MarkdownPlugin implements BasePlugin {
      extensions: string[];
      url(file: FileInfo, site: SiteInfo): string;
      title(file: FileInfo, site: SiteInfo): any;
      build(opts: PluginBuildOptions, dryRun?: boolean): boolean;
  }

}
declare module '@a-morphous/wanderer-plugin-markdown/utils/extract-links' {
  export const extractLinks: (markdownText: string) => string[];

}
declare module '@a-morphous/wanderer-plugin-markdown/utils/get-relative-url' {
  import type { SiteInfo } from '@a-morphous/wanderer';
  export const getRelativeURL: (site: SiteInfo, sourceFileURL: string, targetURL: string) => string;

}
declare module '@a-morphous/wanderer-plugin-markdown/utils/is-url' {
  export const isURL: (str: string) => boolean;

}
declare module '@a-morphous/wanderer-plugin-markdown/utils/wikilinks' {
  import type { IFileCache } from '@a-morphous/wanderer';
  export const processAllWikilinks: (text: string, allFiles: IFileCache) => string;

}
declare module '@a-morphous/wanderer-plugin-markdown' {
  import main = require('@a-morphous/wanderer-plugin-markdown/index');
  export = main;
}