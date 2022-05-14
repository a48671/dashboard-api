import { Logger } from 'tslog';
import { ILogger } from './logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger;

	constructor() {
		this.logger = new Logger({
			displayFunctionName: false,
			displayLoggerName: false,
			displayInstanceName: false,
			displayFilePath: 'hidden',
		});
	}

	log(...args: Array<unknown>): void {
		this.logger.info(...args);
	}

	error(...args: Array<unknown>): void {
		this.logger.error(...args);
	}

	warn(...args: Array<unknown>): void {
		this.logger.warn(...args);
	}
}
