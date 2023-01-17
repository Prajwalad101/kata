import { profile } from 'console';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.HOST}/api/auth/google/redirect`,
    },
    (_accessToken, _refreshToken, _profile, done) => {
      return done(null, profile);
    }
  )
);
