import { Router } from 'express';
import { ingredientsValidator } from './ingredients.validator';
import { ingredientsController} from './ingredients.controller';

const ingredientsRouter = Router();

ingredientsRouter
.get('/', ingredientsValidator.getAllIngredients,
ingredientsController.getAllIngredients)
.get('/:id', ingredientsController.getIngredientById)
.post('/', ingredientsValidator.createIngredient,
ingredientsController.createIngredient)
.delete('/:id', ingredientsController.deleteIngredientById);

export default ingredientsRouter;