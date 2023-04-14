import mongoose from 'mongoose';

const interactionsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A user is required'],
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: [true, 'A business is required'],
  },
  count: {
    type: Number,
    default: 1,
  },
});

// Keeps track of interactions between user and business. This is required to handle hitscore calculations.
const Interaction = mongoose.model('Interaction', interactionsSchema);

export default Interaction;
