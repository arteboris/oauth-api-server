import { Router } from 'express';
import { productsValidator } from './products.validator';
import { productsController } from './products.controller';

const productsRouter = Router();

productsRouter
.get('/', productsValidator.getAllProducts,
productsController.getAllProducts)
.get('/:id', productsController.getProductById)

export default productsRouter;