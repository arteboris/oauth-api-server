import { usersModel } from './users.model';

class UsersController {
    constructor() {};

    get registerUser() {
        return this._registerUser.bind(this);
    };

    async _registerUser(req, res, next) {
        const { name, email, password, tel } = req.body;
        try{
            const checkUser = await usersModel.findUserByEmail(email);
            if(checkUser) return res.status(400).json('User with such email already exists')

            const user = await usersModel.createUser(name, email, password, tel);
            
            await user.save((err, data) => {
                if(err) throw err;
                
                delete data._doc.password_hash;
                delete data._doc.password_salt;
                return res.status(201).json({'status registered': 'success', 'user': data});
            });
        } catch (err) {
            next(err);
        }
    };
};

export const usersController = new UsersController();