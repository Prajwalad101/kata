import express from 'express';
import passport from 'passport';
import {
  handleUserToken,
  passportErrorHandler,
} from '../controllers/authController';
import '../utils/auth/googleAuth';
import '../utils/auth/jwt';

const router = express.Router();

router.route('/google/start').get(
  passport.authenticate('google', {
    scope: ['email', 'profile', 'openid'],
    session: false,
  })
);

router.route('/google/redirect').get(
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_ORIGIN}?authentication=error&message=invalid-credentials`,
    session: false,
  }),
  handleUserToken,
  passportErrorHandler
);

export default router;
