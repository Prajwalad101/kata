import mongoose from 'mongoose';

const loggerSchema = new mongoose.Schema(
  {
    endpoint: String,
    method: String,
    status: Number,
    request: Object,
    response: Object,
    ip: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userAgent: String,
    referrer: String,
  },
  { timestamps: true }
);

const Logger = mongoose.model('Logger', loggerSchema);
export default Logger;
