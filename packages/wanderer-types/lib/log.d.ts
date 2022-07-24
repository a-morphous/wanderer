export declare enum LOG_LEVEL {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3
}
declare class LoggerClass {
    protected currentLogLevel: LOG_LEVEL;
    set(logLevel: LOG_LEVEL): void;
    log(logLevel: LOG_LEVEL, ...message: any): void;
}
export declare const Logger: LoggerClass;
export {};
