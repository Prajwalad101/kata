import { IReview } from '@destiny/common/types';
import { model, Schema } from 'mongoose';

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
  },
  { timestamps: true }
);

const Review = model<IReview>('Review', reviewSchema);

export default Review;
