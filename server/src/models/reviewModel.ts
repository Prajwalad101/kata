import { IReview } from '@destiny/common/types';
import { model, Schema } from 'mongoose';
import AppError from '../utils/appError';
import User from './userModel';

const reviewSchema = new Schema<IReview>(
  {
    review: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Rating cannot be empty'],
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
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

// before saving review, update the user model
reviewSchema.pre('save', async function (next) {
  const user = await User.findById(this.author);

  if (!user)
    return next(new AppError('No author found with the given id', 400));

  // update trustPoints and reviews
  user.trustPoints += 5;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user.reviews.push(this._id as any);
});

const Review = model<IReview>('Review', reviewSchema);

export default Review;
