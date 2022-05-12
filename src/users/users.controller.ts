import { BaseController } from '../common/base.controller';
import { LoggerService } from '../logger/logger.service';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error.class';

export class UsersController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);

    this.bindRoutes([
      { method: 'post', path: '/login', func: this.login },
      { method: 'post', path: '/register', func: this.register}
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, 'Error of auth'));
    // this.ok<string>(res, 'login');
  }

  register(req: Request, res: Response) {
    this.ok<string>(res, 'register');
  }
}
