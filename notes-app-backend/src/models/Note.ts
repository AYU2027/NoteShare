import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface INote extends Document {
  title: string;
  content: string;
  owner: IUser['_id'];
  sharedWith: IUser['_id'][];
}

const NoteSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sharedWith: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default mongoose.model<INote>('Note', NoteSchema);