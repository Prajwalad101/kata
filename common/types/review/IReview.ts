import { Schema } from 'mongoose';

export interface IReview {
  _id: string;
  review: string;
  rating: number;
  likes: number;
  dislikes: number;
  business: Schema.Types.ObjectId;
  createdAt: string;
  author: Schema.Types.ObjectId;
  images?: string[];
}
