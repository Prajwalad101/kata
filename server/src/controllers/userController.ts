import { NextFunction, Request, Response } from 'express';
import Report from '../models/reportModel';
import User from '../models/userModel';
import catchAsync from '../utils/catchAsync';

export const getAllUsers = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const userQuery = User.find();

    const allUsers = await userQuery;

    res.json({
      status: 'success',
      documentCount: allUsers.length,
      data: allUsers,
    });
  }
);

export const findUser = async (id: string) => {
  const user = await User.findOne({ providerId: id });
  return user;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createUser = async (profile: any) => {
  const user = await User.create({
    userName: profile.displayName,
    ...(profile.email && { email: profile.email }),
    picture: profile.photos[0].value,
    provider: profile.provider,
    providerId: profile.id,
  });
  return user;
};

export const reportUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    console.log(req.body.userId);

    // create a report document
    await Report.create({ ...req.body, user: req.body.userId });

    // increase reportCount on the user document
    await User.findByIdAndUpdate(req.body.id, {
      $inc: { reportCount: 1 },
    });

    res.status(204).json();
  }
);
