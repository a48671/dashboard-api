import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';

function bootstrap() {
  const logger = new LoggerService();

  const app = new App(logger, new UsersController(logger));
  app.init();
}

bootstrap();
