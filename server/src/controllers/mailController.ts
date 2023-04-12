import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import Mailgun from 'mailgun.js';
import formData from 'form-data';
import AppError from '../utils/appError';
import User from '../models/userModel';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'prajwalad101@gmail.com',
  key: process.env.MAILGUN_API_KEY as string,
});

export const sendMail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.user as any;

    const user = await User.findById(data._id);

    // FIXME: Seems to be a variable syntax error
    if (!userData) {
      const error = new AppError('User not found', 400);
      return next(error);
    }

    if (
      !user.email ||
      !req.body.receiverEmail ||
      !req.body.message ||
      !req.body.subject
    ) {
      const error = new AppError(
        'Missing required fields: (receiverEmail, message or subject)',
        400
      );
      return next(error);
    }

    if (!process.env.MAILGUN_DOMAIN) {
      return next(new AppError('Mailgun Domain not found', 400));
    }

    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: user.email,
      to: [req.body.receiverEmail],
      subject: `[Kata] ${req.body.subject}`,
      template: 'businessmail',
      'h:X-Mailgun-Variables': JSON.stringify({
        title: req.body.subject,
        content: req.body.message,
      }),
    });

    res
      .status(200)
      .json({ status: 'success', message: 'Mail successfully sent' });
  }
);
