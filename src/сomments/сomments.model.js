import mongoose from 'mongoose';
import timestamp from '../helpers/timestamp';

const { Schema } = mongoose;

const commentSchema = new Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    text: { type: String, required: true},
    mark: { type: Number, required: true, min: 1, max: 5},
}, {
    versionKey: false,
});

commentSchema.plugin(timestamp);

commentSchema.statics.getAllComments = getAllComments;
commentSchema.statics.getCommentById = getCommentById;
commentSchema.statics.createComment = createComment;
commentSchema.statics.updatedCommentById = updatedCommentById;
commentSchema.statics.deleteCommentById = deleteCommentById;

async function getAllComments(product, author){
    try{
        if(product) return await this.find({ product: product})
        else if(author) return await this.find({ author: author})
        else return this.find();
    } catch(err){
        return null;
    };
};

async function getCommentById(id){
    try{
        return await this.findById(id);
    } catch(err){
        return null;
    };
};

async function createComment(authorId, productId, text, mark) {
    try{
        return this({
            product: productId,
            author: authorId,
            text,
            mark,
        });
    } catch(err){
        return next(err);
    };
};

async function updatedCommentById(id, body){
    try{
        return await this.findOneAndUpdate(
            {_id: id},
            body,
            {new: true},
        );
    } catch(err){
        throw err;
    };
};

async function deleteCommentById(id){
    try{
        return await this.findByIdAndDelete(id);
    } catch(err){
        throw err;
    };
};

export const commentsModel = mongoose.model('Comment', commentSchema);