import validator from 'node-validator';

class CommentsValidator {
    constructor() {};

    get getAllComments() {
        return this._getAllComments.bind(this);
    };

    async _getAllComments(req, res, next) {
        const url = req.url;
        if(!url.includes('?')) next();

        const productQuery = req.query.product;
        const authorQuery = req.query.author;

        if(url.includes('?') && productQuery){
            const product = productQuery.split(",");
            if(product.length === 1) next();
        };

        if(url.includes('?') && authorQuery){
            const author = authorQuery.split(",");
            if(author === 1) next()
        };

        return res.status(400).json('SmartBin: Invalid URL');
    };

    get createComment () {
        return this._createComment.bind(this);
    };

    async _createComment(req, res, next){
        const url = req.url;
        if(url.includes('?')) return res.status(400).json('SmartBin: Invalid URL');

        const token = req.headers.authorization;
        if(!token) return res.status(403).json({status: 'not authorized', message: 'Missing token provided.'});

        const createCommentRules = validator.isObject()
        .withRequired("product", validator.isString())
        .withRequired("text", validator.isString())
        .withRequired("mark", validator.isNumber({min: 1, max: 5}));

        validator.run(createCommentRules, req.body, (errorCount, errors) => {
            if(errorCount) return res.status(400).json(errors);

            next();
        });
    };

    get updatedCommentById() {
        return this._updatedCommentById.bind(this);
    };

    async _updatedCommentById(req, res, next){
        const token = req.headers.authorization;
        if(!token) return res.status(403).json({status: 'not authorized', message: 'Missing token provided.'});

        const body = req.body;
        if(!body) return res.status(400).json({ message : "missing fields"})

        const updatedCommentRules = validator.isObject()
        .withOptional("product", validator.isString())
        .withOptional("author", validator.isString())
        .withOptional("text", validator.isString())
        .withOptional("mark", validator.isNumber({min: 1, max: 5}));

        validator.run(updatedCommentRules, req.body, (errorCount, errors) => {
            if(errorCount) return res.status(400).json(errors);

            next();
        });
    };

    get deleteCommentById() {
        return this._deleteCommentById.bind(this);
    };

    async _deleteCommentById(req, res, next) {
        const token = req.headers.authorization;
        if(token) next()

        return res.status(403).json({status: 'not authorized', message: 'Missing token provided.'});
    };
};

export const commentsValidator = new CommentsValidator();