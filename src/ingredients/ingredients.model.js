import mongoose from 'mongoose';
import timestamp from '../helpers/timestamp';

const { Schema } = mongoose;

const ingredientSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
}, {
    versionKey: false,
});

ingredientSchema.plugin(timestamp);

ingredientSchema.statics.getAllIngredients = getAllIngredients;
ingredientSchema.statics.getIngredientById = getIngredientById;
ingredientSchema.statics.deleteIngredientById = deleteIngredientById;
ingredientSchema.statics.createIngredient = createIngredient;

async function getAllIngredients() {
    try{
        return await this.find();
    } catch(err){
        next(err);
    };
};

async function getIngredientById(id){
    try{
        return await this.findById(id);
    } catch(err){
        return null;
    };
};

async function deleteIngredientById(id){
    try{
        return this.findByIdAndDelete(id);
    } catch(err){
        return null;
    };   
};


async function createIngredient(name, description){
    try{
        return this({
            name,
            description,
        });
    } catch(err){
        next(err);
    };
};


export const ingredientsModel = mongoose.model('Ingredients', ingredientSchema);