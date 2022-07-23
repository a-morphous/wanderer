import { BasePlugin } from './objects/plugins/base-plugin';
import { SiteInfo } from './types';
export declare const wanderer: (siteInfo: SiteInfo, plugins?: BasePlugin[]) => Promise<void>;
