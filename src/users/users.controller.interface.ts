import { NextFunction, Request, Response, Router } from 'express';

export interface IUsersController {
	router: Router;
	login(req: Request, res: Response, next: NextFunction): void;
	register(req: Request, res: Response, next: NextFunction): void;
	info(req: Request, res: Response, next: NextFunction): void;
}
