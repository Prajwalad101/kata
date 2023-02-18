import { IQuestion } from '@destiny/common/types';
import { model, Schema } from 'mongoose';

const questionSchema = new Schema<IQuestion>(
  {
    question: {
      type: String,
    },
    replies: {
      author: Schema.Types.ObjectId,
      likes: {
        type: Number,
        default: 0
      },
      reply: {
        type: String,
      }
    },
    likes: { type: Number, default: 0 },
    business: {
      type: Schema.Types.ObjectId,
      ref: 'Business',
      required: [true, 'A review must include a business'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A review must have an author'],
    },
  },
  { timestamps: true }
);

// index based on business name and address
questionSchema.index({ review: 'text' });

// update the user model after saving
/* questionSchema.post('save', async function (doc) {
  await User.findByIdAndUpdate(doc.author, {
    $inc: { trustPoints: 5 },
    $push: { reviews: doc._id },
  });
}); */

// update business ratings
/* questionSchema.post('save', async function (doc) {
  const ratingIndex = doc.rating - 1;

  await Business.findByIdAndUpdate(doc.business, {
    $inc: { [`ratings.${ratingIndex}`]: 1 },
  });
}); */

const Question = model<IQuestion>('Review', questionSchema);

export default Question;
