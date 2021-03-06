import { Router, Response } from 'express';
import { IControllerRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';

@injectable()
export class BaseController {
	private readonly _router: Router;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): Response {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): Response {
		return this.send<T>(res, 200, message);
	}

	public created(res: Response): Response {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: Array<IControllerRoute>): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);

			const handler = route.func.bind(this);
			const middlewares = route.middlewares?.map((m) => m.execute.bind(m));
			const handlers = middlewares ? [...middlewares, handler] : handler;

			this.router[route.method](route.path, handlers);
		}
	}
}
