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
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IUsersService) private usersService: IUsersService,
		@inject(TYPES.IConfigService) private configService: IConfigService,
	) {
		super(loggerService);

		this.bindRoutes([
			{
				method: 'post',
				path: '/login',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				method: 'post',
				path: '/register',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				method: 'get',
				path: '/info',
				func: this.info,
				middlewares: [],
			},
		]);
	}

	async login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.usersService.validateUser(req.body);

		if (result) {
			const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'));
			this.ok(res, { jwt });
		} else {
			next(new HTTPError(401, 'Error of auth'));
		}
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

		this.ok(res, { name: result.name, email: result.email, id: result.id });
	}

	async info({ user }: Request, res: Response): Promise<void> {
		this.ok(res, { email: user });
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{ algorithm: 'HS256' },
				(err, res) => {
					if (err) {
						reject(err);
						return;
					}
					resolve(res as string);
				},
			);
		});
	}
}
