import { Schema } from "mongoose";
import { IUser } from "./IUser";

export interface IQuestion {
  _id: Schema.Types.ObjectId;
  author: IUser;
  business: Schema.Types.ObjectId;
  question: string;
  replies: {
    author: string;
    likes: number;
    reply: string;
  }[];
  likes: {
    users: string[];
    value: number;
  };
  createdAt: string;
}
