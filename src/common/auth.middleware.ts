import { IMiddleware } from './middleware.interface';
import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction) {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (payload && payload instanceof Object) {
					req.user = payload.email;
				}
			});
		}
		next();
	}
}
