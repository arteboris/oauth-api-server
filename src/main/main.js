import { Router } from 'express';

const mainRouter = Router();

mainRouter
.get('/', (req, res, next) => {
    const url = req.url;
    if(url.includes('?')) return res.status(400).json({SmartBin: 'Invalid URL'});
    return res.status(200).json({message: 'Welcome to the API!'});
});

export default mainRouter;