import mongoose from 'mongoose';

const cooldownSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A user is required'],
    },
    // in hrs
    cooldownPeriod: {
      type: Number,
      required: [true, 'A cooldown period is required'],
    },
  },
  { timestamps: true }
);

const Cooldown = mongoose.model('Cooldown', cooldownSchema);

export default Cooldown;
