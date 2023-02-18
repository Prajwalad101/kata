import {Schema} from 'mongoose'

export interface IQuestion {
  _id: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  business: Schema.Types.ObjectId;
  question: string;
  replies: {
    author: string;
    likes: number;
    reply: string;
  }[],
  likes: number,
  createdAt: string;
}
