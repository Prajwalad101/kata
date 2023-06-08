import express from 'express';
import passport from 'passport';
import {
  handleUserToken,
  passportErrorHandler,
} from '../controllers/authController';
import '../utils/auth/facebookAuth';
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
    failureRedirect: `${process.env.CLIENT_ORIGIN}?authentication=error&message=something went wrong`,
    session: false,
  }),
  handleUserToken,
  passportErrorHandler
);

router
  .route('/facebook/start')
  .get(passport.authenticate('facebook', { session: false }));

router
  .route('/facebook/redirect')
  .get(passport.authenticate('facebook', { session: false }))
  .get(handleUserToken, passportErrorHandler);

export default router;
