import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';

function bootstrap() {
  const logger = new LoggerService();

  const app = new App(
    logger,
    new UsersController(logger),
    new ExceptionFilter(logger)
);
  app.init();
}

bootstrap();
