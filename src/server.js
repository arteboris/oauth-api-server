import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import mainRouter from './main/main';
import usersRouter from './users/users.router';
import sessionsRouter from './sessions/sessions.router';
import ingredientsRouter from './ingredients/ingredients.router';
import productsRouter from './products/products.router';
import commentsRouter from './сomments/сomments.router';

init();

async function init() {
    const app = express();
    await conectToDb(config);

    initMiddleware(app);
    initRouters(app);

    app.listen(config.port);
};

async function initMiddleware(app){
    app.use(bodyParser.json());
    app.use(cors());
};

async function initRouters(app){
    app.use('/', mainRouter);
    app.use('/ingredients', ingredientsRouter);
    app.use('/products', productsRouter);
    app.use('/comments', commentsRouter);
    app.use('/auth', sessionsRouter);
    app.use('/auth/register', usersRouter);
    app.use('/auth/*', (req, res, next) => {
        res.status(404).json({ SmartBin: 'Invalid URL' })
    });
};

async function conectToDb(config) {
    try {
        const url = config.mongodb_url;
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
    } catch(err) {
        throw err;
    };
};