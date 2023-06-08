import mongoose, { model } from 'mongoose';

const reportModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    reportedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Reported by field is required'],
    },
    violations: [
      {
        type: String,
        validate: {
          validator: (v: string[]) => v.length > 0,
          message: 'A report must contain at least one violation',
        },
      },
    ],
  },
  { timestamps: true }
);

const Report = model('Report', reportModel);
export default Report;
