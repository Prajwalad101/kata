import mongoose from 'mongoose';

const businessHitsSchema = new mongoose.Schema(
  {
    type: { type: String },
    metadata: {
      businessId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Business Id is required'],
      },
    },
  },
  {
    timeseries: {
      timeField: 'timestamp',
      metaField: 'metadata',
    },
    timestamps: { createdAt: 'timestamp', updatedAt: false },
    expireAfterSeconds: 604800, // 1 week
  }
);

const BusinessHits = mongoose.model('BusinessHit', businessHitsSchema);

export default BusinessHits;
