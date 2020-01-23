import { ingredientsModel } from './ingredients.model';

class IngredientsController {
    constructor() {};

    get getAllIngredients() {
        return this._getAllIngredients.bind(this);
    };

    async _getAllIngredients(req, res, next){
        try {
            const ingredients = await ingredientsModel.getAllIngredients();
            if(!ingredients) return res.status(404).json({ status : 'failed', ingredients: 'no ingredients'})

            return res.status(200).json({'status': 'success', 'ingredients': ingredients});
        } catch (err){
            next(err);
        };
    };

    get getIngredientById() {
        return this._getIngredientById.bind(this);
    };

    async _getIngredientById(req, res, next){
        const id = req.params.id;
        try{
            const ingredient = await ingredientsModel.getIngredientById(id);
            if(!ingredient) return res.status(404).json({'status': 'failed', 'ingredient': 'no ingredient'})

            return res.status(200).json({'status': 'success', 'ingredient': ingredient});
        } catch(err) {
            next(err);
        };
    };

    get deleteIngredientById() {
        return this._deleteIngredientById.bind(this);
    };

    async _deleteIngredientById(req, res, next) {
        const id = req.params.id;
        try{
            const deleteIngredient = await ingredientsModel.deleteIngredientById(id);
            if(!deleteIngredient) return res.status(404).json({'status': 'failed', 'ingredient': 'no ingredient'})

            return res.status(200).json({'status delete': 'success', 'ingredient deleted': deleteIngredient});

        } catch(err){
            next(err);
        };
    };

    get createIngredient() {
        return this._createIngredient.bind(this);
    };


    async _createIngredient(req, res, next){
    const { name, description} = req.body;
        try{
            const ingredient = await ingredientsModel.createIngredient(name, description);
            
            ingredient.save((err, data) => {
                if(err) throw err;
                return res.status(201).json({'status': 'success', 'ingredient': data});
            });
        } catch(err){
            next(err);
        };
    };
};

export const ingredientsController = new IngredientsController();