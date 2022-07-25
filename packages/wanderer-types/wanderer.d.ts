import { BasePlugin } from './objects/plugins/base-plugin';
import { SiteInfo } from './types';
export declare const wanderer: (siteInfo: SiteInfo, useDefaultPlugins?: boolean, plugins?: BasePlugin[]) => Promise<void>;
