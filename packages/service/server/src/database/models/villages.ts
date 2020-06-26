import { Types, Schema, model, Document } from "mongoose";
import { User } from "./users";

export interface Village extends Document {
    name: string;
    members: User[];
}

const villageSchema = new Schema({
    name: {type: String},
    members: [Types.ObjectId],
});

export const Village = model<Village>('Village', villageSchema);
