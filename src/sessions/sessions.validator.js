import validator from 'node-validator';

class SessionsValidator {
    constructor() {};

    get getUser() {
        return this._getUser.bind(this);
    };

    async _getUser(req, res, next) {
        const url = req.url;
        const token = req.headers.authorization;
        if(url.includes('?')){
            return res.status(400).json({SmartBin: 'Invalid URL'})
        };
        if(!token){
            return res.status(403).json({status: 'failed', message: 'Missing required token'})
        };

        next();
    };

    get signOut() {
        return this._signOut.bind(this);
    };

    async _signOut(req, res, next) {
        const url = req.url;
        const token = await req.headers.authorization;
        if(url.includes('?')){
            return res.status(400).json({SmartBin: 'Invalid URL'})
        };
        if(!token) {
            return res.status(403).json({status: 'failed', message: 'Missing token provided.'})
        };
        next();
    };

    get signIn() {
        return this._signIn.bind(this);
    };

    async _signIn(req, res, next){
        const url = req.url;
        if(url.includes('?')){
            return res.status(400).json({SmartBin: 'Invalid URL'})
        };
        try{
            const signInRules = validator.isObject()
        .withRequired("email", validator.isString({ regex: /@/i }))
        .withRequired("password", validator.isString())

        validator.run(signInRules, req.body, (errCount, errors) => {
            if(errCount) return res.status(400).json(errors);

            next();
        });
        } catch(err){
            next(err);
        };
    };
};

export const sessionsValidator = new SessionsValidator();