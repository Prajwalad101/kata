import { NextFunction, Request, Response } from 'express';
import '../loadEnv';
import { getGoogleOAuthTokens } from '../utils/auth';
import catchAsync from '../utils/catchAsync';

export const handleGoogleOauth = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const code = req.query.code as string;
    const data = await getGoogleOAuthTokens({ code });

    console.log(data);
    // const googleUser = jwt.decode(id_token);

    // get the id and access token from code

    // get user with tokens

    // upsert the user

    // create a session

    // create access and refresh tokens

    // set cookies

    // redirect back to client
  }
);
