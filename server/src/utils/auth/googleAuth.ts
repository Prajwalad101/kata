import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';
import { createUser, findUser } from '../../controllers/userController';

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.HOST}/api/auth/google/redirect`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      let user;
      if (!profile.email_verified) {
        return done(null, false); // triggers failure redirect
      }
      try {
        user = await findUser(profile.id);
        if (!user) {
          user = await createUser(profile);
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
