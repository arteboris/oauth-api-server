import { commentsModel } from './сomments.model';
import { sessionsModel } from '../sessions/sessions.model';
import { productsModel } from '../products/products.model';

class CommentsController {
    constructor() {};

    get getAllComments() {
        return this._getAllComments.bind(this);
    };

    async _getAllComments(req, res, next) {
        const product = req.query.product;
        const author = req.query.author;

        try{
            const comments = await commentsModel.getAllComments(product, author);
            if(!comments) return res.status(404).json({ status : 'failed', message: 'Not found'});

            return res.status(200).json({status: 'success', comments: comments});
        } catch(err) {
            next(err);
        };
    };

    get getCommentById() {
        return this._getCommentById.bind(this);
    };

    async _getCommentById(req, res, next){
        const id = req.params.id;
        try{
            const comment = await commentsModel.getCommentById(id);
            if(!comment) return res.status(404).json({ status : 'failed', message: 'Not found'});

            return res.status(200).json({status: 'success', comment: comment});
        } catch(err){
            next(err);
        };
    };

    get createComment() {
        return this._createComment.bind(this);
    };

    async _createComment(req, res, next){
        const { product, text, mark} = req.body;
        const bearerAndToken = req.headers.authorization;
        const token = bearerAndToken.split('Bearer ')[1]
        try{
            const session = await sessionsModel.getUser(token);
            if(!session) return res.status(401).json({ status: 'failed', message: 'Not found token'});
            const authorId = session._doc.user_id;

            const checkProduct = await productsModel.getProductById(product);
            if(!checkProduct) return res.status(404).json({ status: 'failed', message: 'Not found product'});

            const comment = await commentsModel.createComment(authorId, product, text, mark);
            comment.save((err, data) => {
                if(err) throw err;

                return res.status(201).json({ status: 'success', comment: data});
            });
        } catch(err) {
            return next(err);
        };
    };

    get updatedCommentById() {
        return this._updatedCommentById.bind(this);
    };

    async _updatedCommentById(req, res, next) {
        const id = req.params.id;
        const body = {
            ...req.body,
            'updatedAt': Date.now(),
        };
        const bearerAndToken = req.headers.authorization;
        const token = bearerAndToken.split('Bearer ')[1];
        try{
            const session = await sessionsModel.getUser(token);
            if(!session) return res.status(401).json({ status: 'failed', message: 'Not found token'});
            const userId = session._doc.user_id;

            const comment = await commentsModel.getCommentById(id);
            if(!comment) return res.status(401).json({ status: 'failed', message: 'Not found comment'});
            const authorId = comment._doc.author;

            if(!userId.equals(authorId)) return res.status(401).json({status: 'failed', message: 'you have no right'});

            const updatedComment = await commentsModel.updatedCommentById(id, body);

            return res.status(200).json({status: 'success updated', comment: updatedComment })
        } catch(err){
            next(err);
        };
    };

    get deleteCommentById(){
        return this._deleteCommentById.bind(this);
    };

    async _deleteCommentById(req, res, next){
        const id = req.params.id;
        const bearerAndToken = req.headers.authorization;
        const token = bearerAndToken.split('Bearer ')[1];
        try{
            const session = await sessionsModel.getUser(token);
            if(!session) return res.status(401).json({ status: 'failed', message: 'Not found token'});
            const userId = session._doc.user_id;

            const comment = await commentsModel.getCommentById(id);
            if(!comment) return res.status(401).json({ status: 'failed', message: 'Not found comment'});
            const authorId = comment._doc.author;

            if(!userId.equals(authorId)) return res.status(401).json({status: 'failed', message: 'you have no right'});

            const deletedComment = await commentsModel.deleteCommentById(id);
            return res.status(200).json({status: 'success deleted', comment: deletedComment })
        } catch(err){
            next(err);
        };
    };
};

export const commentsController = new CommentsController();