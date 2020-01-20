import { Router } from 'express';
import { usersValidator } from './users.validator';
import { usersController } from './users.controller';

const usersRouter = Router();

usersRouter
.post(
    '/',
    usersValidator.registerUser,
    usersController.registerUser,
);

export default usersRouter;