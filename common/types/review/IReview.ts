import { Schema } from "mongoose";
import { IUser } from "../IUser";

export interface IReview {
  _id: string;
  review: string;
  rating: number;
  likes: { value: number; users: string[] };
  dislikes: number;
  business: Schema.Types.ObjectId;
  createdAt: string;
  author: IUser;
  images?: string[];
}
