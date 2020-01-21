import mongoose from 'mongoose';
import randomstring from 'randomstring';
import { createHash } from 'crypto';
import timestamp from '../helpers/timestamp';

const { Schema } = mongoose;

const sessionSchema = new Schema({
    user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    token: { type: String, required: true},
    expires_at: { type: Date, required: true},
    status: { type: Number, required: true, default: 1},
}, {
    versionKey: false,
});

sessionSchema.plugin(timestamp);

sessionSchema.statics.createSession = createSession;
sessionSchema.statics.signOut = signOut;
sessionSchema.statics.getUser = getUser;

async function getUser(token){
    try{
        return await this.findOne({token});
    } catch(err){
        return null;
    };
};

async function signOut(token){
    try{
        return await this.findOneAndDelete({ token: token });
    } catch(err){
        return null;
    };
};

async function createSession(user){
    const userId = user._id;
    
    const token = createHash('sha256').update(userId + randomstring.generate(16)).digest('hex');

    return this({
        user_id: userId,
        token,
        expires_at: new Date(Date.now() + 24*60*60*1000),
    });
};

export const sessionsModel = mongoose.model('Session', sessionSchema);