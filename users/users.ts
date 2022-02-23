import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/login', (req, res) => {
  res.send('login');
});

usersRouter.post('/register', (req, res) => {
  res.send('register');
});

export { usersRouter };
