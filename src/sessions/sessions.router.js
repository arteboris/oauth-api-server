import { Router } from 'express';
import { sessionsValidator } from './sessions.validator';
import { sessionsController } from './sessions.controller';
import productsRouter from '../products/products.router';

const sessionsRouter = Router();

sessionsRouter
.get('/current', sessionsValidator.getUser,
sessionsController.getUser)
.get('/logout', sessionsValidator.signOut,
sessionsController.signOut)
.post('/login', sessionsValidator.signIn,
sessionsController.signIn)
.post('/products', productsRouter)
.patch('/products', productsRouter)
.delete('/products', productsRouter)
.post('/comments', commentsRouter)
.patch('/comments', commentsRouter)
.delete('comments', commentsRouter);

export default sessionsRouter;