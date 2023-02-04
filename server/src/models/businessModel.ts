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
    city: { type: String, required: [true, 'City is required'] },
    workingDays: [
      {
        day: { type: String, required: [true, 'Day field is required'] },
        startTime: { type: String, required: [true, 'Start time is required'] },
        endTime: { type: String },
      },
    ],
    contactNumber: {
      type: String,
      required: [true, 'Contact Number is required'],
    },
    email: { type: String, required: [true, 'Email is required'] },
    directions: [
      {
        type: String,
        required: [true, 'Directions is required'],
        validate: {
          validator: (v: string[]) => v.length > 0,
          message: 'A business must contain at least 1 direction',
        },
      },
    ],
    category: { type: String, required: [true, 'Category is required'] },
    subcategory: {
      type: String,
      required: [true, 'subcategory is required'],
    },
    location: [
      {
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
    ],
    features: {
      type: [String],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'A business must contain 1 or more features',
      },
    },
    socials: {
      type: [String],
      required: [true, 'Socials is required'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'A business must contain at least 1 socials',
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

// index based on business name and address
businessSchema.index({ name: 'text', 'location.address': 'text' });

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

//--------LEGACY CODE---------
// businessSchema.pre('find', function (next) {
//   this.populate({
//     path: 'reviews',
//     select: 'review -business',
//     perDocumentLimit: 2,
//     options: { sort: { likes: -1, createdAt: -1 } },
//   });

//   next();
// });

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
