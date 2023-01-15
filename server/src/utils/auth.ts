import axios from 'axios';
import qs from 'querystring';

interface GoogleTokensResult {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

export const getGoogleOAuthTokens = async ({
  code,
}: {
  code: string;
}): Promise<GoogleTokensResult> => {
  const url = 'https://oauth2.googleapis.com/token';

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    grant_type: 'authorization_code',
  };

  console.log(values);

  try {
    const res = await axios.post<GoogleTokensResult>(
      url,
      qs.stringify(values),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err, 'Failed to fetch Google Oauth token');
    throw new Error(err);
  }
};

import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';

const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

passport.use(
  new Strategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: 'http://localhost:4000/api/auth/google/callback',
    },
    function (accessToken: string, _refreshToken: string, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));
