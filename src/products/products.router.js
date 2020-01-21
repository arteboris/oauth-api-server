import { Router } from 'express';
import { productsValidator } from './products.validator';
import { productsController } from './products.controller';

const productsRouter = Router();

productsRouter
.get('/', productsValidator.getAllProducts,
productsController.getAllProducts)
.get('/:id', productsController.getProductById)
.post('/', productsValidator.createProduct,
productsController.createProduct)
.put('/:id', productsValidator.updatedProductId,
productsController.updatedProductId)
.delete('/:id', productsValidator.deleteProductId, 
productsController.deleteProductId);

export default productsRouter;