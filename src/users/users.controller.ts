import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IUsersController } from './users.controller.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { IUsersService } from './users.service.interface';
import { User } from './user.entity';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IUsersService) private usersService: IUsersService,
	) {
		super(loggerService);

		this.bindRoutes([
			{ method: 'post', path: '/login', func: this.login },
			{
				method: 'post',
				path: '/register',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		next(new HTTPError(401, 'Error of auth'));
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.usersService.createUser({
			password: body.password,
			login: body.login,
			email: body.email,
		});

		if (!result) {
			return next(new HTTPError(422, 'Such user has already exist'));
		}

		this.ok<User>(res, result);
	}
}
