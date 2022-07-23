/// <reference types="node" />
import { FileInfo } from '../types';
import { PathLike } from 'fs';
export declare enum QUERY_BOOLEAN_OPERATORS {
    AND = "AND",
    OR = "OR",
    NOT = "NOT"
}
export declare enum QUERY_MODIFIER_OPERATIONS {
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
declare type BaseQueryOpts = {
    sortBy?: string;
    limit?: number;
    isAscending?: boolean;
};
declare type QueryPredicate = {
    key: string;
    value?: any;
    modifier: QUERY_MODIFIER_OPERATIONS;
    operator?: QUERY_BOOLEAN_OPERATORS;
};
export declare type QueryOpts = BaseQueryOpts & {
    rawQuery?: string;
    predicates?: QueryPredicate[];
};
declare type TagQuery = {
    tag: string;
    operator: QUERY_BOOLEAN_OPERATORS;
};
export declare type TagQueryOpts = BaseQueryOpts & {
    tags: TagQuery[];
};
export declare class FileDB {
    protected files: FileInfo[];
    constructor(files: FileInfo[]);
    query(queryOpts: QueryOpts): FileInfo[];
    /**
     * Helper function to query tags in files, where tags are defined in the file's configuration
     * as an array of strings, representing the tags.
     * @param query
     * @returns
     */
    queryTags(query: TagQueryOpts): FileInfo[];
    /**
     * Helper function to query for files that are in the same directory as one provided
     * @param directory
     * @param opts
     * @param alsoMatchSubdirectories
     * @returns
     */
    queryDirectory(directory: PathLike, opts?: QueryOpts, alsoMatchSubdirectories?: boolean): FileInfo[];
    get all(): FileInfo[];
}
export {};
