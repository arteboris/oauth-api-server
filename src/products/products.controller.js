import { productsModel } from './products.model';
import { sessionsModel } from '../sessions/sessions.model';

class ProductsController {
    constructor() {};

    get getAllProducts() {
        return this._getAllProducts.bind(this);
    };

    async _getAllProducts(req, res, next){
        const created = req.query.created;
        try{
           const products = await productsModel.getAllProducts(created);
           if(!products) {
            return res.status(404).json({ status : 'failed', message: 'Not found'})
           };

           return res.status(200).json({ status: 'success', products: products });
        } catch(err) {
            return next(err);
        };
    };

    get getProductById() {
        return this._getProductById.bind(this);
    };

    async _getProductById(req, res, next){
        const id = req.params.id;
        try{
            const product = await productsModel.getProductById(id);
            if(!product){
                return res.status(404).json({ status: 'failed', message: 'Not found'});
            };

            return res.status(200).json({ status: 'success', product: product});
        } catch(err){
            return next(err);
        };
    };

    get createProduct () {
        return this._createProduct.bind(this);
    };

    async _createProduct(req, res, next){
        const { name, description, price, currency, categories, ingredients} = req.body;
        const bearerAndToken = req.headers.authorization;
        const token = bearerAndToken.split('Bearer ')[1]
        try{
            const session = await sessionsModel.getUser(token);
            if(!session) return res.status(401).json({ status: 'failed', message: 'Not found token'});
            const userId = session._doc.user_id;
            const product = await productsModel.createProduct(userId, name, description, price, currency, categories, ingredients);
            
            await product.save((err, data) => {
                if (err) return res.status(400).json(err);
                return res.status(201).json({'status': 'success', 'product': data});
            });
        }catch(err){
            return next(err);
        };
    };

    get updatedProductId() {
        return this._updatedProductId.bind(this);
    };

    async _updatedProductId(req, res, next){
        const id = req.params.id;
        const body = {
            ...req.body,
            'updatedAt': Date.now(),
        };
        const bearerAndToken = req.headers.authorization;
        const token = bearerAndToken.split('Bearer ')[1]
        try{
            const session = await sessionsModel.getUser(token);
            if(!session) return res.status(401).json({ status: 'failed', message: 'Not found token'});
            const userId = session._doc.user_id;

            const product = await productsModel.getProductById(id);
            if(!product) return res.status(404).json({ status: 'failed', message: 'Not found product'});
            const createdId = product._doc.created;

            if(!userId.equals(createdId)) {
                return res.status(401).json({status: 'failed', message: 'you have no right' })
            };

            const updateProduct = await productsModel.updatedProductId(id, body);
            if(!updateProduct){
                return res.status(404).json({'status': 'failed', message: 'Not found product'});
            };
            return res.status(200).json({'status': 'success updated', 'product updated': updateProduct});
        } catch(err){
            return next(err);
        };
    };

    get deleteProductId() {
        return this._deleteProductId.bind(this);
    };

    async _deleteProductId(req, res, next){
        const id = req.params.id;
        const bearerAndToken = req.headers.authorization;
        const token = bearerAndToken.split('Bearer ')[1]
        try{
            const session = await sessionsModel.getUser(token);
            if(!session) return res.status(401).json({ status: 'failed', message: 'Not found token'});
            const userId = session._doc.user_id;

            const product = await productsModel.getProductById(id);
            if(!product) return res.status(404).json({ status: 'failed', message: 'Not found product'});
            const created = product._doc.created;

            if(!userId.equals(created)) {
                return res.status(401).json({status: 'failed', message: 'you have no right' })
            };

            const deleteProduct = await productsModel.deleteProductId(id);
                if(!deleteProduct){
                    return res.status(404).json({ status: 'failed', message: 'Not found product'});
                };
                return res.status(200).json({ message: "product deleted", 'product delete': deleteProduct});
        } catch(err) {
            next(err);
        };
    };

};

export const productsController = new ProductsController();