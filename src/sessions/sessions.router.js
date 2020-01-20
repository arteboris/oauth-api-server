import { Router } from 'express';
import { sessionsValidator } from './sessions.validator';
import { sessionsController } from './sessions.controller';

const sessionsRouter = Router();

sessionsRouter
.get('/current', sessionsValidator.getUser,
sessionsController.getUser)
.get('/logout', sessionsValidator.signOut,
sessionsController.signOut)
.post('/login', sessionsValidator.signIn,
sessionsController.signIn);

export default sessionsRouter;