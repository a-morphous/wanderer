import { Configuration, FileInfo, PageConfig, SiteInfo } from '../types';
import { FileDB } from './db';
export declare enum CONFIG_RECURSION_LEVEL {
    NONE = 0,
    IMMEDIATE_PARENT = 1,
    ALL = 2
}
export declare class FileCache {
    protected files: Record<string, FileInfo>;
    protected _db: FileDB;
    protected nestedConfiguration: Record<string, Configuration>;
    protected siteInfo: SiteInfo;
    constructor(siteInfo: SiteInfo);
    generate(): Promise<void>;
    protected generateConfig(): Promise<Record<string, Configuration>>;
    protected generateFiles(): Promise<Record<string, FileInfo>>;
    getConfigForFile(fileId: string, recursive?: CONFIG_RECURSION_LEVEL): PageConfig;
    get allFiles(): FileInfo[];
    get db(): FileDB;
    getFileFromPath(sourcePath: string): FileInfo[];
    getAllFilesWithExts(exts: string[], not?: boolean): FileInfo[];
    getFilesWithSimilarNames(file: FileInfo): FileInfo[];
}
