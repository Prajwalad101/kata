import express from 'express';
import { createQuestion, getAllQuestions } from '../controllers/questionController';
import { jwtAuth } from '../middlewares/jwtAuthMiddleware';

const router = express.Router();


router.route('/').get(getAllQuestions).post(
  jwtAuth(), // authenticate users before creating reviews
  createQuestion
);

router
  .route('/:id')
  .get()
  .patch()
  .delete();

export default router;
