import express from 'express';
import {
  createQuestion,
  createReply,
  getAllQuestions,
  getQuestion,
  handleQuestionLikes,
} from '../controllers/questionController';
import { jwtAuth } from '../middlewares/jwtAuthMiddleware';

const router = express.Router();

router.route('/').get(getAllQuestions).post(jwtAuth(), createQuestion);

router.route('/reply').post(jwtAuth(), createReply);

router
  .route('/:id')
  .get(getQuestion)
  .patch(jwtAuth(), handleQuestionLikes)
  .delete();

export default router;
