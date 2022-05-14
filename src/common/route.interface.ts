import { NextFunction, Request, Response, Router } from 'express';

export interface IControllerRoute {
	method: keyof Pick<Router, 'post' | 'get' | 'delete' | 'patch' | 'put'>;
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
}
