import toml from '@iarna/toml';
export declare const streamFrontmatter: (filename: any) => Promise<toml.JsonMap>;
export declare const getTextAfterFrontmatter: (filename: any) => string;
