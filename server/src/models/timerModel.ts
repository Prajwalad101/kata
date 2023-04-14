import mongoose from 'mongoose';

const timerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A user is required'],
    },
    // timer duration in hours
    duration: {
      type: Number,
      required: [true, 'Timer is required'],
    },
    // action to reverse after timer expires
    action: {
      type: String,
      enum: ['cooldown', 'suspend'],
      required: [true, 'Action is required'],
    },
  },
  { timestamps: true }
);

// Keeps track of cooldown periods for users.
const Timer = mongoose.model('Timer', timerSchema);

export default Timer;
