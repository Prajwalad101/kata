import { Schema } from 'mongoose';
import { IUser } from '../IUser';

export interface IReview {
  _id: string;
  review: string;
  rating: number;
  likes: number;
  dislikes: number;
  business: Schema.Types.ObjectId;
  createdAt: string;
  author: IUser;
  images?: string[];
}
