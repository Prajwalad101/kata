import { NextFunction, Request, Response } from 'express';
import Report from '../models/reportModel';
import Timer from '../models/timerModel';
import User from '../models/userModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import { suspendUser } from '../utils/user/suspendUser';

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
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.userId || !req.body.reportedBy) {
      const error = new AppError('userId and reportedBy are required', 400);
      return next(error);
    }

    const reporter = await User.findById(req.body.reportedBy);
    if (reporter?.onCooldown) {
      const error = new AppError(
        'You must wait 24 hours before reporting another user',
        400
      );
      return next(error);
    }

    const user = await User.findById(req.body.userId);

    if (!user) {
      const error = new AppError(
        'The user you are trying to report does not exist',
        404
      );
      return next(error);
    }

    // put the user who reported on cooldown to prevent spams
    await User.findByIdAndUpdate(req.body.reportedBy, {
      onCooldown: true,
    });

    // create a cooldown timer of 30 seconds for user who reported
    // const COOLDOWN_PERIOD = 24;
    const COOLDOWN_PERIOD = 0.00833333333;

    await Timer.create({
      user: req.body.reportedBy,
      duration: COOLDOWN_PERIOD,
      action: 'cooldown',
    });

    // keep track of report count on users
    if (user?.reportCount >= 4) {
      // reset report count and suspend user
      await User.findByIdAndUpdate(req.body.userId, { reportCount: 0 });
      suspendUser(req.body.userId);
    } else {
      await User.findByIdAndUpdate(req.body.userId, {
        $inc: { reportCount: 1 },
      });

      await Report.create({ ...req.body, user: req.body.userId });
    }
    res.status(204).json();
  }
);
