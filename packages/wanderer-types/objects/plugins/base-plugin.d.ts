import { FileInfo, SiteInfo } from '../../types';
import { FileDB } from '../db';
import { FileCache } from '../pages';
export declare type PluginOperationOptions = {
    site: SiteInfo;
    allFiles: FileCache;
    allURLs: Record<string, string>;
    database: FileDB;
};
export declare type PluginBuildOptions = PluginOperationOptions & {
    file: FileInfo;
    url: string;
};
export declare type EXTENSIONS_UNUSED = 'UNUSED';
export interface BasePlugin {
    /**
     * extensions that the plugin works on. `build` is called per file in the plugin
     * use EXTENSIONS_UNUSED to make this plugin work on all files that are not already handled by another plugin (and aren't configuration toml files)
     */
    extensions: string[] | EXTENSIONS_UNUSED;
    url: (file: FileInfo, site: SiteInfo) => string;
    beforeBuild?: (opts: PluginOperationOptions) => void;
    build: (opts: PluginBuildOptions, dryRun?: boolean) => boolean;
    afterBuild?: (opts: PluginOperationOptions) => void;
}
