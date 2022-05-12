import { BaseController } from '../common/base.controller';
import { LoggerService } from '../logger/logger.service';
import { Request, Response } from 'express';

export class UsersController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);

    this.bindRoutes([
      { method: 'post', path: '/login', func: this.login },
      { method: 'post', path: '/register', func: this.register}
    ]);
  }

  login(req: Request, res: Response) {
    this.ok<string>(res, 'login');
  }

  register(req: Request, res: Response) {
    this.ok<string>(res, 'register');
  }
}
