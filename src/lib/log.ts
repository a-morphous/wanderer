export enum LOG_LEVEL {
	DEBUG = 0,
	INFO = 1,
	WARN = 2,
	ERROR = 3,
}

const LOG_LABELS = ['DEBUG', 'INFO', 'WARN', 'ERROR']

class LoggerClass {
	protected currentLogLevel: LOG_LEVEL = LOG_LEVEL.WARN
	set(logLevel: LOG_LEVEL) {
		this.currentLogLevel = logLevel
	}
	log(logLevel: LOG_LEVEL, ...message: any) {
		if (this.currentLogLevel <= logLevel) {
			console.log(`${LOG_LABELS[logLevel]}: `, ...message)
		}
	}
}

export const Logger = new LoggerClass()
