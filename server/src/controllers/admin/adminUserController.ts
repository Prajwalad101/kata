import { NextFunction, Response, Request } from 'express';
import User from '../../models/userModel';
import { APIFeatures } from '../../utils/apiFeatures';
import catchAsync from '../../utils/catchAsync';

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const userQuery = User.find();

    req.query.fields =
      'userName,email,picture,reportCount,numQuestions,trustPoints,blocked';

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

    let allUsers = await apiFeatures.query;

    allUsers = allUsers.map((value: unknown) => {
      const user = JSON.parse(JSON.stringify(value));
      return {
        id: user._id,
        ...user,
        blocked: user.blocked ? 'true' : 'false',
      };
    });

    res.json(allUsers);
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
