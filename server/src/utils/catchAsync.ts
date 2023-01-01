import { NextFunction, Request, Response } from 'express';

const catchAsync = (
  handler: (_req: Request, _res: Response, _next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  };
};

export default catchAsync;
