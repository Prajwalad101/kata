import { IBusiness, IReview } from '@destiny/common/types';
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
    likes: {
      value: {
        type: Number,
        default: 0,
      },
      users: [{ type: Schema.Types.ObjectId }],
    },
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

// index based on business name and address
reviewSchema.index({ review: 'text' });

// update the user model after saving
reviewSchema.post('save', async function (doc) {
  await User.findByIdAndUpdate(doc.author, {
    $inc: { trustPoints: 5, numReviews: 1 },
  });
});

// update business ratings
reviewSchema.post('save', async function (doc, next) {
  const rating = doc.rating;
  const ratingIndex = rating - 1;

  const business = await Business.findById(doc.business);

  if (!business) return next();

  // increment ratings field in business
  business.ratings[ratingIndex] += 1;

  business.ratingCount += 1;
  business.totalRating += rating;
  business.avgRating = business.totalRating / business.ratingCount;

  await business.save();
});

const Review = model<IReview>('Review', reviewSchema);

export default Review;
