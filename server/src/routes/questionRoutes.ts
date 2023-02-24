import express from 'express';
import {
  createQuestion,
  getAllQuestions,
  getQuestion,
} from '../controllers/questionController';
import { jwtAuth } from '../middlewares/jwtAuthMiddleware';

const router = express.Router();

router.route('/').get(getAllQuestions).post(
  jwtAuth(), // authenticate users before creating reviews
  createQuestion
);

router.route('/:id').get(getQuestion).patch().delete();

export default router;
