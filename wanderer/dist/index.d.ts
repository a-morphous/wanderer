declare module '@a-morphous/wanderer/index' {
  export * from '@a-morphous/wanderer/types';
  export * from '@a-morphous/wanderer/objects/site';
  export * from '@a-morphous/wanderer/objects/pages';
  export * from '@a-morphous/wanderer/objects/db';
  export * from '@a-morphous/wanderer/objects/plugins/base-plugin';
  export * from '@a-morphous/wanderer/wanderer';

}
declare module '@a-morphous/wanderer/lib/frontmatter/index' {
  import * as toml from '@iarna/toml';
  export const streamFrontmatter: (filename: any) => Promise<toml.JsonMap>;
  export const getTextAfterFrontmatter: (filename: any) => string;

}
declare module '@a-morphous/wanderer/lib/log' {
  export enum LOG_LEVEL {
      DEBUG = 0,
      INFO = 1,
      WARN = 2,
      ERROR = 3
  }
  class LoggerClass {
      protected currentLogLevel: LOG_LEVEL;
      set(logLevel: LOG_LEVEL): void;
      log(logLevel: LOG_LEVEL, ...message: any): void;
  }
  export const Logger: LoggerClass;
  export {};

}
declare module '@a-morphous/wanderer/lib/recursive-readdir' {
  export const readdirSyncRecursive: (sourceDirectory: string) => string[];

}
declare module '@a-morphous/wanderer/lib/slugify' {
  export const slugify: (str: string) => string;

}
declare module '@a-morphous/wanderer/lib/tempo/index' {
  export const isTempoString: (string: any) => boolean;
  export const tempo: (filename: any) => {
      tempo: any;
      date: Date;
      name: any;
  };

}
declare module '@a-morphous/wanderer/objects/db' {
  /// <reference types="node" />
  import { FileInfo, IFileDB, QueryOpts, TagQueryOpts } from '@a-morphous/wanderer/types';
  import { PathLike } from 'fs';
  export class FileDB implements IFileDB {
      protected files: FileInfo[];
      constructor(files: FileInfo[]);
      query(queryOpts: QueryOpts): FileInfo[];
      queryTags(query: TagQueryOpts): FileInfo[];
      queryDirectory(directory: PathLike, opts?: QueryOpts, alsoMatchSubdirectories?: boolean): FileInfo[];
      get all(): FileInfo[];
  }

}
declare module '@a-morphous/wanderer/objects/pages' {
  import { CONFIG_RECURSION_LEVEL, Configuration, FileInfo, IFileCache, PageConfig, SiteInfo } from "@a-morphous/wanderer/types";
  import { FileDB } from "@a-morphous/wanderer/objects/db";
  export class FileCache implements IFileCache {
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
      getFilesWithTitle(title: string): FileInfo[];
      getAllFilesWithExts(exts: string[], not?: boolean): FileInfo[];
      getFilesWithSimilarNames(file: FileInfo): FileInfo[];
  }

}
declare module '@a-morphous/wanderer/objects/plugins/base-plugin' {
  import { FileInfo, IFileCache, IFileDB, SiteInfo } from "@a-morphous/wanderer/types";
  export type PluginOperationOptions = {
      site: SiteInfo;
      allFiles: IFileCache;
      allURLs: Record<string, string>;
      database: IFileDB;
  };
  export type PluginBuildOptions = PluginOperationOptions & {
      file: FileInfo;
      url: string;
  };
  export type EXTENSIONS_UNUSED = "UNUSED";
  export interface BasePlugin {
      extensions: string[] | EXTENSIONS_UNUSED;
      url: (file: FileInfo, site: SiteInfo) => string;
      title?: (file: FileInfo, site: SiteInfo) => string;
      beforeBuild?: (opts: PluginOperationOptions) => void;
      build: (opts: PluginBuildOptions, dryRun?: boolean) => boolean;
      afterBuild?: (opts: PluginOperationOptions) => void;
  }

}
declare module '@a-morphous/wanderer/objects/plugins/loader' {
  import type { BasePlugin } from '@a-morphous/wanderer/objects/plugins/base-plugin';
  export const loadPluginFromString: (pluginPath: string, nameOfExport?: string, baseDir?: string) => Promise<BasePlugin>;

}
declare module '@a-morphous/wanderer/objects/site' {
  import { SiteInfo } from '@a-morphous/wanderer/types';
  import { BasePlugin } from '@a-morphous/wanderer/objects/plugins/base-plugin';
  import { FileCache } from '@a-morphous/wanderer/objects/pages';
  export class Site {
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

}
declare module '@a-morphous/wanderer/types' {
  /// <reference types="node" />
  import { PathLike } from "fs";
  export type Configuration = Record<string, any>;
  export enum CONFIG_RECURSION_LEVEL {
      NONE = 0,
      IMMEDIATE_PARENT = 1,
      ALL = 2
  }
  export type SiteConfig = {
      plugins?: string[];
      slugifyFunction?: string;
  } & Configuration;
  type DirAndPageCommonConfig = {
      private?: boolean;
      layout?: string;
      feeds?: Record<string, any>;
      tags?: string[];
  };
  export type DirConfig = {
      dir?: string;
  } & DirAndPageCommonConfig & Configuration;
  export type PageConfig = DirAndPageCommonConfig & Configuration;
  export type SiteInfo = {
      siteConfiguration: SiteConfig;
      contentDirectory: string;
      frameDirectory: string;
      buildDirectory: string;
      cacheDirectory: string;
  };
  export type FileInfo = {
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
  export type PageReference = {
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
  export type Page = FileInfo & {
      configuration?: PageConfig;
      isPage: true;
      text: string;
      html?: string;
  };
  export enum QUERY_BOOLEAN_OPERATORS {
      AND = "AND",
      OR = "OR",
      NOT = "NOT"
  }
  export enum QUERY_MODIFIER_OPERATIONS {
      EQUALS = "=",
      NOT = "!=",
      GREATERTHAN = ">",
      GE = ">=",
      LESSTHAN = "<",
      LE = "<=",
      IN = "IN",
      EXISTS = "EXISTS",
      CONTAINS = "CONTAINS"
  }
  type BaseQueryOpts = {
      sortBy?: string;
      limit?: number;
      isAscending?: boolean;
  };
  export type QueryPredicate = {
      key: string;
      value?: any;
      modifier: QUERY_MODIFIER_OPERATIONS;
      operator?: QUERY_BOOLEAN_OPERATORS;
  };
  export type QueryOpts = BaseQueryOpts & {
      rawQuery?: string;
      predicates?: QueryPredicate[];
  };
  type TagQuery = {
      tag: string;
      operator: QUERY_BOOLEAN_OPERATORS;
  };
  export type TagQueryOpts = BaseQueryOpts & {
      tags: TagQuery[];
  };
  export interface IFileDB {
      all: FileInfo[];
      query(queryOpts: QueryOpts): FileInfo[];
      queryTags(query: TagQueryOpts): FileInfo[];
      queryDirectory(directory: PathLike, opts: QueryOpts, alsoMatchSubdirectories?: boolean): FileInfo[];
  }
  export interface IFileCache {
      generate(): Promise<void>;
      getConfigForFile(fileId: string, recursive: CONFIG_RECURSION_LEVEL): PageConfig;
      allFiles: FileInfo[];
      db: IFileDB;
      getFileFromPath(sourcePath: string): FileInfo[];
      getFilesWithTitle(title: string): FileInfo[];
      getAllFilesWithExts(exts: string[], not?: boolean): FileInfo[];
      getFilesWithSimilarNames(file: FileInfo): FileInfo[];
  }
  export {};

}
declare module '@a-morphous/wanderer/wanderer' {
  import { BasePlugin } from "@a-morphous/wanderer/objects/plugins/base-plugin";
  import { SiteInfo } from "@a-morphous/wanderer/types";
  export const wanderer: (siteInfo: SiteInfo, useDefaultPlugins?: boolean, plugins?: BasePlugin[]) => Promise<void>;

}
declare module '@a-morphous/wanderer' {
  import main = require('@a-morphous/wanderer/index');
  export = main;
}