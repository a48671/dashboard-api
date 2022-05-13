import * as express from "express";
import { Express } from "express";
import { Server } from 'http';
import { UsersController } from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UsersController) private usersController: UsersController,
    @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter
  ) {
    this.app = express();
    this.port = 8000;
  }

  useRoutes(): void {
    this.app.use('/users', this.usersController.router);
  }

  useExceptionFilter(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  init(): void {
    this.useRoutes();
    this.useExceptionFilter();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server running on http://localhost:${this.port}`);
  }
}
