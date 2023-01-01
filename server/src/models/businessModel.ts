import { IBusiness } from '@destiny/common/types';
import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema<IBusiness>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'A business must contain a name'],
    },
    description: {
      type: String,
      required: [true, 'A business must contain a description'],
    },
    price: {
      type: String,
      required: true,
      enum: ['cheap', 'medium', 'high', 'exclusive'],
    },
    businessHours: {
      open: {
        type: String,
        required: true,
      },
      close: {
        type: String,
        required: true,
      },
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: String,
    },
    category: {
      type: String,
      required: [true, 'A business must contain a category'],
    },
    subCategory: {
      type: String,
      required: [true, 'A business must contain a subCategory'],
    },
    features: {
      type: [String],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'A business must contain 1 or more features',
      },
    },
    images: {
      type: [String],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'A business must contain 2 or more images',
      },
    },
    total_rating: { type: Number, default: 0 },
    rating_count: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

businessSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'business',
  localField: '_id',
});

// calculate the avgRating field from total_rating & rating_count
// only runs when creating business and updating business through save (done in reviewMiddleware)
businessSchema.pre('save', function (next) {
  if (this.total_rating === 0 || this.rating_count === 0) return next();

  this.avgRating = this.total_rating / this.rating_count;
  next();
});

businessSchema.pre('find', function (next) {
  this.populate({
    path: 'reviews',
    select: 'review -business',
    perDocumentLimit: 2,
    options: { sort: { likes: -1, createdAt: -1 } },
  });

  next();
});

// businessSchema.pre('findOne', function (next) {
//   this.populate({
//     path: 'reviews',
//     select: '-business review rating likes dislikes createdAt',
//     options: { sort: '-likes' },
//     perDocumentLimit: 10,
//   });

//   next();
// });

const Business = mongoose.model<IBusiness>('Business', businessSchema);

export default Business;
