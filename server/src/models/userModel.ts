import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'A user must have a username'],
  },
  provider: {
    type: String,
    required: [true, 'A user must have a provider'],
  },
  email: {
    type: String,
  },
  picture: {
    type: String,
    required: [true, 'A user must have a profile picture'],
  },
  providerId: {
    type: String,
    required: [true, 'A user must have a provider id'],
  },
  trustPoints: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: 'Review',
  },
  numQuestions: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model('User', userSchema);
export default User;
