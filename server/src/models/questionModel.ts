import { IQuestion } from '@destiny/common/types';
import { model, Schema } from 'mongoose';
import User from './userModel';

const questionSchema = new Schema<IQuestion>(
  {
    question: {
      type: String,
    },
    replies: [
      {
        author: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: [true, 'A reply must have an author'],
        },
        likes: {
          type: Number,
          default: 0,
        },
        reply: {
          type: String,
        },
      },
    ],
    likes: { type: Number, default: 0 },
    business: {
      type: Schema.Types.ObjectId,
      ref: 'Business',
      required: [true, 'A question must include a business'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A question must have an author'],
    },
  },
  { timestamps: true }
);

// index based on business name and address
questionSchema.index({ question: 'text' });

// update the user model after saving
questionSchema.post('save', async function (doc) {
  await User.findByIdAndUpdate(doc.author, {
    $inc: { numQuestions: 1 },
  });
});

const Question = model<IQuestion>('Question', questionSchema);

export default Question;
