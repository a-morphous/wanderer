export declare type Configuration = Record<string, any>;
export declare type SiteConfig = {
    plugins?: string[];
} & Configuration;
declare type DirAndPageCommonConfig = {
    private?: boolean;
    layout?: string;
    feeds?: Record<string, any>;
    tags?: string[];
};
export declare type DirConfig = {
    dir?: string;
} & DirAndPageCommonConfig & Configuration;
export declare type PageConfig = DirAndPageCommonConfig & Configuration;
export declare type SiteInfo = {
    siteConfiguration: SiteConfig;
    contentDirectory: string;
    frameDirectory: string;
    buildDirectory: string;
    cacheDirectory: string;
};
export declare type FileInfo = {
    sourcePath: string;
    sourceDir: string;
    name: string;
    ext: string;
    created: Date;
    updated?: Date;
    date?: Date;
    id: string;
    configuration?: Configuration;
    url?: string;
    title?: string;
};
/**
 * Used to refer to a different page without needing the whole page object
 */
export declare type PageReference = {
    configuration?: Configuration;
    sourceName: string;
    created?: Date;
    updated?: Date;
    date?: Date;
    id: string;
    title: string;
    url: string;
    nextPage?: PageReference;
    previousPage?: PageReference;
};
export declare type Page = FileInfo & {
    configuration?: PageConfig;
    isPage: true;
    text: string;
};
export {};
