import mongoose from 'mongoose';

const loggerSchema = new mongoose.Schema({
  endpoint: String,
  method: String,
  status: Number,
  request: Object,
  response: Object,
});

const Logger = mongoose.model('Logger', loggerSchema);
export default Logger;
