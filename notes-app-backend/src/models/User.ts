import mongoose, { Document, Schema } from 'mongoose';
import { INote } from './Note';

export interface IUser extends Document {
  username: string;
  password?: string;
  notes: INote['_id'][];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
});

export default mongoose.model<IUser>('User', UserSchema);