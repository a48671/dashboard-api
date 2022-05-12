import * as express from "express";
import { Express } from "express";
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;
  usersController: UsersController;
  exceptionFilter: ExceptionFilter;

  constructor(
    logger: LoggerService,
    usersController: UsersController,
    exceptionFilter: ExceptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.usersController = usersController;
    this.exceptionFilter = exceptionFilter
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
