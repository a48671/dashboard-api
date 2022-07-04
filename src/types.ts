import { IUsersController } from './users/users.controller.interface';
import { IUsersService } from './users/users.service.interface';
import { IConfigService } from './config/config.service.interface';

export const TYPES = {
	Application: Symbol.for('Application'),
	IExceptionFilter: Symbol.for('IExceptionFilter'),
	IUsersController: Symbol.for('IUsersController'),
	IUsersService: Symbol.for('IUsersService'),
	ILogger: Symbol.for('ILogger'),
	IConfigService: Symbol.for('IConfigService'),
	PrismaService: Symbol.for('PrismaService'),
};
