import {
    Types, Schema, model, Document,
} from 'mongoose';
import { Village } from '@project-a/vampeer-shared';

const villageSchema = new Schema({
    name: { type: String },
    members: [Types.ObjectId],
});

export const MongoVillage = model<Village & Document>('Village', villageSchema);
