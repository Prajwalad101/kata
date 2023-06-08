import passport from 'passport';
import passportJwt from 'passport-jwt';

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.AUTH_SECRET,
};

passport.use(
  new passportJwt.Strategy(jwtOptions, (payload, done) => {
    done(null, payload);
  })
);
