import mongoose from 'mongoose';

const businessHitsSchema = new mongoose.Schema(
  {
    hitScore: { type: Number, required: [true, 'weight field is required'] },
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
    expireAfterSeconds: 30 * 24 * 60 * 60, //  30 days
  }
);

const BusinessHits = mongoose.model('BusinessHit', businessHitsSchema);

export default BusinessHits;
