import mongoose from 'mongoose';

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
    required: [true, 'A user must have an email'],
  },
  picture: {
    type: String,
    required: [true, 'A user must have a profile picture'],
  },
  providerId: {
    type: String,
    required: [true, 'A user must have a provider id'],
  },
});

const User = mongoose.model('User', userSchema);
export default User;
