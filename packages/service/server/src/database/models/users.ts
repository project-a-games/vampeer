import { Types, Schema, model, Document } from 'mongoose';
import { Village } from './villages';

export interface User extends Document {
    email: string;
    villages: Village[];
};

const userSchema =  new Schema({
    email: {type: String, required: true, unique: true},
    villages: {type: Types.ObjectId},
});

export const User = model<User>('User', userSchema);
