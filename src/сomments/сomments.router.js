import { Router } from 'express';
import { commentsValidator } from './сomments.validator';
import { commentsController } from './сomments.controller';

const commentsRouter = Router();

commentsRouter
.get('/', commentsValidator.getAllComments,
commentsController.getAllComments)
.get('/:id', commentsController.getCommentById)
.post('/', commentsValidator.createComment,
commentsController.createComment)
.patch('/:id', commentsValidator.updatedCommentById,
commentsController.updatedCommentById)
.delete('/:id', commentsValidator.deleteCommentById,
commentsController.deleteCommentById);

export default commentsRouter;