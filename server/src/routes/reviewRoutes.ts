import express from 'express';
import reviewController from '../controllers/reviewController';
import {
  deleteBusinessRating,
  incrementBusinessRating,
  updateBusinessRating,
} from '../middlewares/review/reviewMiddleware';
import uploadFiles from '../utils/multer/uploadFiles';

const router = express.Router();

// multer middleware to process files
const upload = uploadFiles({
  path: '../client/public/uploads/images/reviews/',
  maxCount: 10,
  fieldName: 'image',
});

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(upload, incrementBusinessRating, reviewController.createReview);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(updateBusinessRating, reviewController.updateReview)
  .delete(deleteBusinessRating, reviewController.deleteReview);

export default router;
