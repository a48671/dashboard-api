import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
	bind<UsersController>(TYPES.UsersController).to(UsersController);
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): { app: App; appContainer: Container } {
	const appContainer = new Container();
	appContainer.load(appBindings);

	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
