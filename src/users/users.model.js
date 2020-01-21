import mongoose from 'mongoose';
import { createHash } from 'crypto';
import randomstring from 'randomstring';
import timestamp from '../helpers/timestamp.js';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password_hash: { type: String, required: true},
    password_salt: {type: String, required: true},
    tel: { type: Number, required: false},

    verification_token: { type: String, required: false},
    verification_token_expires_at: { type: Date, required: false},
}, {
    versionKey: false,
});

userSchema.plugin(timestamp);

userSchema.statics.findUserById = findUserById;
userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.createUser = createUser;
userSchema.statics.createPasswordHash = createPasswordHash;

async function findUserById(id){
    try{
        return await this.findById(id);
    } catch (err) {
        return null;
    };
};

async function findUserByEmail(email){
    try{
        return await this.findOne({email});
    } catch (err){
        return null;
    };
};

async function createUser(name, email, password, tel) {
    const passwordSalt = randomstring.generate(16);
    const passwordHash = await createPasswordHash(password, passwordSalt);

    return this({
        name,
        email,
        password_hash: passwordHash,
        password_salt: passwordSalt,
        tel,
    });
};

async function createPasswordHash(password, passwordSalt){
    return await createHash('sha256').update(password + passwordSalt).digest('hex');
};

export const usersModel = mongoose.model('User', userSchema);