import { Router } from 'express';
import { commentsValidator } from './сomments.validator';
import { commentsController } from './сomments.controller';

const commentsRouter = Router();

commentsRouter
.get('/', commentsValidator.getAllComments,
commentsController.getAllComments)
.get('/:id', commentsController.getCommentById)

export default commentsRouter;