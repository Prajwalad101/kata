import passport from 'passport';
import '../utils/auth/jwt';

export const jwtAuth = () => {
  return passport.authenticate('jwt', { session: false });
};
