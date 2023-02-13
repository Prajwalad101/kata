import { IReview } from '@destiny/common/types';
import { model, Schema } from 'mongoose';
import Business from './businessModel';
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
    images: {
      type: [String],
    },
  },
  { timestamps: true }
);

// update the user model after saving
reviewSchema.post('save', async function (doc) {
  await User.findByIdAndUpdate(doc.author, {
    $inc: { trustPoints: 5 },
    $push: { reviews: doc._id },
  });
});

// update business ratings
reviewSchema.post('save', async function (doc) {
  const ratingIndex = doc.rating - 1;

  await Business.findByIdAndUpdate(doc.business, {
    $inc: { [`ratings.${ratingIndex}`]: 1 },
  });
});

const Review = model<IReview>('Review', reviewSchema);

export default Review;
