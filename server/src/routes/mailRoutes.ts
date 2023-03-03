import express from 'express';
import { sendMail } from '../controllers/mailController';
import { jwtAuth } from '../middlewares/jwtAuthMiddleware';

const router = express.Router();

router.route('/').post(jwtAuth(), sendMail);
// router.route('/').post(sendMail);
export default router;
