import express from 'express';
import {
  deleteReview,
  getAllReviews,
  getReview,
} from '../../controllers/admin/adminReviewController';

const router = express.Router();

router.route('/').get(getAllReviews);
router.route('/:id').get(getReview).delete(deleteReview);
export default router;
