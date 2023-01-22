import passport from 'passport';
import { Strategy } from 'passport-facebook';
import { createUser, findUser } from '../../controllers/userController';

passport.use(
  new Strategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      callbackURL: `${process.env.HOST}/api/auth/facebook/redirect`,
      profileFields: ['id', 'displayName', 'picture', 'email'],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      let user;

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
