import mongoose, { Schema } from 'mongoose';
import IPoem from '../interfaces/poem';

const PoemSchema: Schema = new Schema(
  {
    title: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    contentPostErasure: { type: String }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPoem>('Poem', PoemSchema);
