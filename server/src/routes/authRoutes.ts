import express from 'express';
import passport from 'passport';
import '../utils/auth';

const router = express.Router();

// router.route('/google').get(handleGoogleOauth);

router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['email', 'profile'] }));

router.route('/google/callback').get(
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
  })
);

export default router;
