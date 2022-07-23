/**
 * This gets converted into a TaffyDB query.
 */
export declare type FeedQuery = {
    directory?: string;
    tags?: [];
    isAscending?: boolean;
    sortBy: string;
    limit: number;
};
export declare type Configuration = Record<string, any>;
export declare type SiteConfig = {
    plugins?: string[];
} & Configuration;
declare type DirAndPageCommonConfig = {
    private?: boolean;
    layout?: string;
    feeds?: Record<string, FeedQuery>;
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
};
/**
 * Used to refer to a different page without needing the whole page object
 */
export declare type PageReference = {
    configuration?: Configuration;
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
    title?: string;
    text: string;
};
export declare type Feed = {};
export {};
