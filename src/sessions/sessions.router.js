import { Router } from 'express';
import { sessionsValidator } from './sessions.validator';
import { sessionsController } from './sessions.controller';
import { productsValidator } from '../products/products.validator';
import { productsController } from '../products/products.controller';
import { commentsValidator } from '../сomments/сomments.validator.js';
import { commentsController } from '../сomments/сomments.controller.js';

const sessionsRouter = Router();

sessionsRouter
.get('/current', sessionsValidator.getUser,
sessionsController.getUser)
.get('/logout', sessionsValidator.signOut,
sessionsController.signOut)
.post('/login', sessionsValidator.signIn,
sessionsController.signIn)
.post('/products', productsValidator.createProduct,
productsController.createProduct)
.put('/products/:id', productsValidator.updatedProductId,
productsController.updatedProductId)
.delete('/products/:id', productsValidator.deleteProductId, 
productsController.deleteProductId)
.post('/comments', commentsValidator.createComment,
commentsController.createComment)
.patch('/comments/:id', commentsValidator.updatedCommentById,
commentsController.updatedCommentById)
.delete('/comments/:id', commentsValidator.deleteCommentById,
commentsController.deleteCommentById);

export default sessionsRouter;