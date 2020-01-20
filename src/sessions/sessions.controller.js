import { usersModel } from '../users/users.model';
import { sessionsModel } from './sessions.model';

class SessionsController {
    constructor() {};

    get getUser() {
        return this._getUser.bind(this);
    };

    async _getUser(req, res, next){
        const bearerAndToken = req.headers.authorization;
        const token = bearerAndToken.split('Bearer ')[1];
        try{
            const session = await sessionsModel.getUser(token);
            if(!session){
                return res.status(401).json({'status': 'failed', 'message': 'there is no such token'});
            };
            const userId = session._doc.user_id;

            const user = await usersModel.findUserById(userId);
            if(!user){
                return res.status(401).json({'status': 'failed', 'user': 'Not found'});
            };

            delete user._doc.password_hash;
            delete user._doc.password_salt;
            return res.status(200).json({'status': 'success', 'user': user});

        } catch(err){
            next(err);
        };
    };


    get signOut() {
        return this._signOut.bind(this);
    };

    async _signOut(req, res, next){
        const bearerAndToken = req.headers.authorization;
        const token = bearerAndToken.split('Bearer ')[1];
        try{
            const deleteToken = await sessionsModel.signOut(token);
            if(!deleteToken) {
            return res.status(401).json({'status': 'failed', 'message': 'there is no such token'});
            };

            return res.status(200).json({'status': 'success', 'message': 'log out'});
        } catch(err){
            next(err);
        };
    };

    get signIn() {
        return this._signIn.bind(this);
    };

    async _signIn(req, res, next) {
        const { email, password } = req.body;
        try{
            const user = await usersModel.findUserByEmail(email);
            if(!user) {
                return res.status(401).json({'status': 'failed', 'message': 'User with such email does not exist'});
            }; 

            const checkPassword = await this.checkPasswordHash(user, password);

            if(!checkPassword) {
                return res.status(401).json({'status': 'failed', 'message': 'User password is wrong'});
            };

            const token = await sessionsModel.createSession(user);

            await token.save((err, data) => {
                if(err) throw err;
                return res.status(201).json({'status': 'authorized success', 'token': data._doc.token});
            });
        } catch(err) {
            next(err);
        };
    };

    async checkPasswordHash(user, password){
        const { password_hash, password_salt} = user;
        try{   
            const receivedPasswordHash = await usersModel.createPasswordHash(password, password_salt);
            return (password_hash === receivedPasswordHash);
        } catch(err){
            return next(err);
        };
    };
};

export const sessionsController = new SessionsController();