import {
    Types, Schema, model, Document,
} from 'mongoose';
import { User } from '@project-a/vampeer-shared';

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    villages: [Types.ObjectId],
});

export const MongoUser = model<User & Document>('User', userSchema);
