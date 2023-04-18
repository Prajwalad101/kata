import { NextFunction, Response, Request } from 'express';
import User from '../../models/userModel';
import { APIFeatures } from '../../utils/apiFeatures';
import catchAsync from '../../utils/catchAsync';

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const userQuery = User.find();

    if (req.query._end && req.query._start) {
      req.query.limit = String(
        Number(req.query._end) - Number(req.query._start)
      );
      req.query.skip = req.query._start;

      // delete original query params
      delete req.query._end;
      delete req.query._start;
    }

    const apiFeatures = new APIFeatures(userQuery, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const allUsers = await apiFeatures.query;
    const users = allUsers.map((user: any) => {
      const userCpy = JSON.parse(JSON.stringify(user));
      return { id: userCpy._id, ...userCpy };
    });

    res.json(users);
  }
);

export const getUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const user = await User.findById(req.params.id);
    res.json(user);
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(204).json();
  }
);
