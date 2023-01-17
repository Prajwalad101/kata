import { NextFunction, Request, Response } from 'express';
import '../loadEnv';
import generateAccessToken from '../utils/auth/generateToken';
import catchAsync from '../utils/catchAsync';

export const handleUserToken = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const accessToken = generateAccessToken('userId123');
    res.status(200).json({ accessToken });
  }
);
