import { Logger } from 'tslog';

export class LoggerService {
  public logger: Logger;

  constructor() {
    this.logger = new Logger({
      displayFunctionName: false,
      displayLoggerName: false,
      displayInstanceName: false,
      displayFilePath: 'hidden'
    })
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
