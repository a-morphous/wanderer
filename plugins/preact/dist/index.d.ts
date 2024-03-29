declare module '@a-morphous/wanderer-plugin-preact/index' {
  /// <reference path="../../../../../../../Users/amorphous/sanctuary/frameworks/wanderer/wanderer/dist/index.d.ts" />
  import type { BasePlugin, FileInfo, PageReference, PluginBuildOptions, SiteInfo } from '@a-morphous/wanderer';
  import { PluginOperationOptions } from '@a-morphous/wanderer/index';
  export type PageProps = {
      css?: string;
      js?: string;
      next?: PageReference;
      previous?: PageReference;
      feeds?: Record<string, PageReference[]>;
      _baseDir: string;
  };
  export default class ReactPlugin implements BasePlugin {
      extensions: string[];
      url(file: FileInfo, site: SiteInfo): string;
      title(file: FileInfo, site: SiteInfo): any;
      beforeBuild?: (opts: PluginOperationOptions) => void;
      build(opts: PluginBuildOptions, dryRun?: boolean): Promise<boolean>;
      afterBuild?: (opts: PluginOperationOptions) => void;
  }

}
declare module '@a-morphous/wanderer-plugin-preact' {
  import main = require('@a-morphous/wanderer-plugin-preact/index');
  export = main;
}