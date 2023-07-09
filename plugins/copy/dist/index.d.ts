declare module '@a-morphous/wanderer-plugin-copy/index' {
  import type { BasePlugin, FileInfo, PluginBuildOptions, SiteInfo } from '@a-morphous/wanderer';
  export default class CopyPlugin implements BasePlugin {
      extensions: "UNUSED";
      url(fileInfo: FileInfo, site: SiteInfo): string;
      build(opts: PluginBuildOptions): boolean;
  }

}
declare module '@a-morphous/wanderer-plugin-copy' {
  import main = require('@a-morphous/wanderer-plugin-copy/index');
  export = main;
}