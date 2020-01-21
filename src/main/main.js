import { Router } from 'express';

const mainRouter = Router();

mainRouter
.get('/', (req, res, next) => {
    res.status(200).json({message: 'Welcome to the API!'});
});

export default mainRouter;