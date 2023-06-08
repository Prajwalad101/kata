import { NextFunction, Request, Response } from 'express';
import '../loadEnv';
import generateAccessToken from '../utils/auth/generateToken';
import catchAsync from '../utils/catchAsync';

export const handleUserToken = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const clientOrigin = process.env.CLIENT_ORIGIN;
    const domainPattern = /(?:https?:\/\/)?(?:www\.)?([\w.-]+)/;

    const matches = clientOrigin.match(domainPattern);
    const domain = matches[1];

    const accessToken = generateAccessToken(req.user);
    res
      .cookie('access-token', accessToken, {
        domain
      })
      .redirect(`${process.env.CLIENT_ORIGIN}?authentication=success`);
  }
);

export const passportErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let message = 'auth-error';

  if (typeof err === 'object' && err !== null && 'message' in err) {
    message = err.message as string;
  }
  res.redirect(
    `${process.env.CLIENT_ORIGIN}?authentication=error&message=${message}`
  );
};
