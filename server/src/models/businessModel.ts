import { IBusiness } from '@destiny/common/types';
import mongoose, { Schema } from 'mongoose';

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A business most contain a business owner'],
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
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: [true, 'Please provide coordinates'],
      },
      address: {
        type: String,
        required: [true, 'Please provide location address'],
      },
    },
    website: String,
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
    verified: { type: Boolean, default: false },
    ratings: {
      type: [Number],
      default: [0, 0, 0, 0, 0],
    },
    totalRating: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// index based on business name and address
businessSchema.index({ name: 'text', 'location.address': 'text' });

// create geospatial index
businessSchema.index({ location: '2dsphere' });

businessSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'business',
  localField: '_id',
});

// calculate the avgRating field from total_rating & rating_count
// only runs when creating business and updating business through save (done in reviewMiddleware)
/* businessSchema.pre('save', function (next) {
  const numRatings = this.ratings.reduce((acc, cur) => acc + cur, 0);
  if (numRatings === 0) return next();

  const totalRating = this.ratings.reduce(
    (acc, cur, i) => acc + cur * (i + 1),
    0
  );

  const avgRating = totalRating / numRatings;
  this.averageRating = avgRating;
  this.totalRating = totalRating;
}); */

const Business = mongoose.model<IBusiness>('Business', businessSchema);

export default Business;
