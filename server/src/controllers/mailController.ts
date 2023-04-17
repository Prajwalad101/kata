import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import Mailgun from 'mailgun.js';
import formData from 'form-data';
import AppError from '../utils/appError';
import User from '../models/userModel';
import { validateUser } from '../utils/user/validateUser';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'prajwalad101@gmail.com',
  key: process.env.MAILGUN_API_KEY as string,
});

export const sendMail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.user as any;
    const user = await User.findById(data._id);

    if (!user) {
      const error = new AppError('User not found', 400);
      return next(error);
    }

    // check if user is suspended or banned
    await validateUser(user._id);

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

interface SendWelcomeMailProps {
  email: string;
  name: string;
}

export const sendWelcomeMail = async ({
  email,
  name,
}: SendWelcomeMailProps) => {
  if (!process.env.MAILGUN_DOMAIN) {
    const error = new AppError('Mailgun Domain not found', 404);
    throw error;
  }

  const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
    from: 'prajwalad101@gmail.com',
    to: email,
    subject: 'Welcome to Kata',
    template: 'welcomeuser',
    'h:X-Mailgun-Variables': JSON.stringify({
      name,
    }),
  });
  return result;
};

type SendRegistrationMailProps = {
  email: string;
  businessName: string;
};
export const sendRegistrationMail = async ({
  email,
  businessName,
}: SendRegistrationMailProps) => {
  if (!process.env.MAILGUN_DOMAIN) {
    const error = new AppError('Mailgun Domain not found', 404);
    throw error;
  }

  const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
    from: 'prajwalad101@gmail.com',
    to: email,
    subject: '[Kata] Business Registered',
    template: 'pendingbusiness',
    'h:X-Mailgun-Variables': JSON.stringify({
      businessName,
    }),
  });
  return result;
};

export const sendRejectionMail = async ({
  email,
  businessName,
}: {
  email: string;
  businessName: string;
}) => {
  if (!process.env.MAILGUN_DOMAIN) {
    const error = new AppError('Mailgun Domain not found', 404);
    throw error;
  }

  const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
    from: 'prajwalad101@gmail.com',
    to: email,
    subject: '[Kata] Business Rejected',
    template: 'rejectionmail',
    'h:X-Mailgun-Variables': JSON.stringify({
      businessName,
    }),
  });
  return result;
};

export const sendVerifiedMail = async ({
  email,
  businessName,
}: {
  email: string;
  businessName: string;
}) => {
  if (!process.env.MAILGUN_DOMAIN) {
    const error = new AppError('Mailgun Domain not found', 404);
    throw error;
  }

  const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
    from: 'prajwalad101@gmail.com',
    to: email,
    subject: '[Kata] Business Verified',
    template: 'business_verified',
    'h:X-Mailgun-Variables': JSON.stringify({
      businessName,
    }),
  });
  return result;
};
