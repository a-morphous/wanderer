declare module '@a-morphous/wanderer-plugin-image/index' {
  import type { BasePlugin, FileInfo, PluginBuildOptions, SiteInfo } from "@a-morphous/wanderer";
  export default class ImagePlugin implements BasePlugin {
      extensions: string[];
      url(file: FileInfo, site: SiteInfo): string;
      build(opts: PluginBuildOptions, dryRun?: boolean): boolean;
  }

}
declare module '@a-morphous/wanderer-plugin-image/processor' {
  export type ProcessImageConfig = {
      noPNGCompress?: boolean;
  };
  export const processImage: (inputFilePath: string, targetFilePath: string, config?: ProcessImageConfig) => Promise<void>;

}
declare module '@a-morphous/wanderer-plugin-image' {
  import main = require('@a-morphous/wanderer-plugin-image/index');
  export = main;
}