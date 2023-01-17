import passport from 'passport';
import passportJwt from 'passport-jwt';

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.AUTH_SECRET,
};

passport.use(
  new passportJwt.Strategy(jwtOptions, (payload, done) => {
    // get user by searching by id
    {
      return done(null, { name: 'John Doe' }, payload);
    }
  })
);
