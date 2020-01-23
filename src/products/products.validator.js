import validator from 'node-validator';

class ProductsValidator {
    constructor() {};

    get getAllProducts() {
        return this._getAllProducts.bind(this);
    };

    async _getAllProducts(req, res, next){
        const url = req.url;
        const createdQuery = req.query.created;
        if(!url.includes('?')){
            return next();
        };
        if(url.includes('?') && createdQuery) {
            const id = createdQuery.split(",");
            if(id.length === 1 ) return next();
        };
        return res.status(400).json('SmartBin: Invalid URL');
    };

    get createProduct () {
        return this._createProduct.bind(this);
    };

    async _createProduct(req, res, next){
        const url = req.url;
        if(url.includes('?')){
            return res.status(400).json('SmartBin: Invalid URL');
        };

        const token = await req.headers.authorization;
        if(!token) {
            return res.status(403).json({status: 'not authorized', message: 'Missing token provided.'});
        };

        const createProductRules = validator.isObject()
        .withRequired("name", validator.isString())
        .withRequired("description", validator.isString())
        .withRequired("price", validator.isNumber())
        .withRequired("currency", validator.isString())
        .withRequired("categories", validator.isArray(validator.isString(), {min: 1}))
        .withRequired("ingredients", validator.isArray(validator.isString(), {min: 1}));

        validator.run(createProductRules, req.body, (errCount, errors) => {
            if(errCount) {
                return res.status(400).json(errors);
            };
            return next();
        });
    };

    get updatedProductId() {
        return this._updatedProductId.bind(this);
    };

    async _updatedProductId(req, res, next){
        const token = await req.headers.authorization;
        if(!token) {
            return res.status(403).json({status: 'not authorized', message: 'Missing token provided.'});
        };

        const updatedProductIdRules = validator.isObject()
        .withOptional("name", validator.isString())
        .withOptional("description", validator.isString())
        .withOptional("price", validator.isNumber())
        .withOptional("currency", validator.isString())
        .withOptional("categories", validator.isArray(validator.isString(), {min: 1}))
        .withOptional("likes", validator.isNumber());

        validator.run(updatedProductIdRules, req.body, (errCount, errors) => {
            if(errCount) {
                return res.status(400).json(errors);
            };
            return next();
        });
    };

    get deleteProductId() {
        return this._deleteProductId.bind(this);
    };

    async _deleteProductId(req, res, next){
        const token = await req.headers.authorization;
        if(!token) {
            return res.status(403).json({status: 'not authorized', message: 'Missing token provided.'})
        };

        next();
    };
};

export const productsValidator = new ProductsValidator();