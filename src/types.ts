import { IUsersController } from './users/users.controller.interface';
import { IUsersService } from './users/users.service.interface';

export const TYPES = {
	Application: Symbol.for('Application'),
	IExceptionFilter: Symbol.for('IExceptionFilter'),
	IUsersController: Symbol.for('IUsersController'),
	IUsersService: Symbol.for('IUsersService'),
	ILogger: Symbol.for('ILogger'),
};
