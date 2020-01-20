import validator from 'node-validator';

class UsersValidator {
    constructor() {};

    get registerUser() {
        return this._registerUser.bind(this);
    };

    async _registerUser(req, res, next) {
        const url = req.url;
        if(url.includes('?')){
            return res.status(400).json({SmartBin: 'Invalid URL'})
        };
        try{
            const registerUserRules = validator.isObject()
            .withRequired("name", validator.isString())
            .withRequired("email", validator.isString({ regex: /@/i }))
            .withRequired("password", validator.isString())
            .withOptional("tel", validator.isNumber());

            validator.run(registerUserRules, req.body, (errCount, errors) => {
                if(errCount) return res.status(400).json(errors);
                next();
            });
        } catch(err){
            next(err);
        };
    };
};

export const usersValidator = new UsersValidator();