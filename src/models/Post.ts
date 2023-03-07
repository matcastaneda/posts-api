import { Schema, model } from 'mongoose';
import { type IPost } from '../types';

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    image: {
      public_id: String,
      secure_url: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

postSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Post = model<IPost>('Post', postSchema);
