import mongoose from 'mongoose';
import timestamp from '../helpers/timestamp';

const { Schema } = mongoose;

const productSchema = new Schema({
    created: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    categories: { type: Array, required: true,
        validate: {
            validator: function(Array){
                return Array.length >=1;
            },
            message: 'there must be at least one category'
        }
    },
    likes: Number,
},
{ 
    versionKey: false,
});

productSchema.plugin(timestamp);

productSchema.statics.getAllProducts = getAllProducts;
productSchema.statics.getProductById = getProductById;
productSchema.statics.createProduct = createProduct;
productSchema.statics.updatedProductId = updatedProductId;
productSchema.statics.deleteProductId = deleteProductId;

async function getAllProducts(created) {
    if(created) {
       return await this.find({created: created});
    };
    return await this.find();
};

async function getProductById(id) {
    try{
        return await this.findById(id);
    } catch(err){
        return null;
    };
};

async function createProduct(userId, name, description, price, currency, categories) {
    try {
        return this({
            created: userId,
            name,
            description,
            price,
            currency,
            categories,
        });
    } catch(err){
        throw err;
    };    
};

async function updatedProductId(id, body) {
    try{
        return await this.findOneAndUpdate(
            { _id: id },
            body,
            { new: true },
        );
    } catch(err) {
        return null;
    }
};

async function deleteProductId (id) {
    try{
        return await this.findByIdAndDelete(id);
    }catch (err) {
        return null;
    }
};

export const productsModel = mongoose.model('Product', productSchema);