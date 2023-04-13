import mongoose from 'mongoose';

const cooldownSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
    cooldownPeriod: {
      type: String,
      enum: ['1hr', '10m', '5hr', '1d', '1w', '1y'],
    },
  },
  { timestamps: true }
);

const Cooldown = mongoose.model('Cooldown', cooldownSchema);

export default Cooldown;
