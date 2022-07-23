import { SiteInfo } from '../types';
import { BasePlugin } from './plugins/base-plugin';
import { FileCache } from './pages';
export declare class Site {
    protected siteInfo: SiteInfo;
    protected fileCache: FileCache;
    protected plugins: BasePlugin[];
    private usedExtensions;
    constructor(config: SiteInfo);
    get contentDir(): string;
    get frameDir(): string;
    get cacheDir(): string;
    get staticDir(): string;
    get buildDir(): string;
    get files(): FileCache;
    addPlugin(plugin: BasePlugin): void;
    make(): Promise<void>;
}
