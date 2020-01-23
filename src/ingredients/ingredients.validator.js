import validator from 'node-validator';

class IngredientsValidator {
    constructor() {};

    get getAllIngredients() {
        return this._getAllIngredients.bind(this);
    };

    async _getAllIngredients(req, res, next){
        const url = req.url;
        if(url.includes('?')){
            return res.status(400).json({SmartBin: 'Invalid URL'});
        };
        next();
    };

    get createIngredient() {
        return this._createIngredient.bind(this);
    };

    async _createIngredient(req, res, next){
        const url = req.url;
        if(url.includes('?')){
            return res.status(400).json({SmartBin: 'Invalid URL'})
        };
        const createIngredientRules = validator.isObject()
        .withRequired("name", validator.isString())
        .withRequired("description", validator.isString());

        validator.run(createIngredientRules, req.body, (errCount, errors) => {
            if(errCount) return res.status(400).json(errors);

            next();
        });
    };

};

export const ingredientsValidator = new IngredientsValidator();