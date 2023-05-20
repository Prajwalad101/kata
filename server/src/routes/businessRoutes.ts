import express from 'express';
import businessController, {
  getHighestRatedBusinesses,
  getNearestBusinesses,
  getTrendingBusinesses,
} from '../controllers/businessController';
import { jwtAuth } from '../middlewares/jwtAuthMiddleware';
import uploadFiles from '../utils/multer/uploadFiles';

const router = express.Router();

/* const upload = uploadFiles({
  path: `${__dirname}/../../assets/uploads/business/`,
  // path: '../client/public/uploads/images/business/',
  maxCount: 30,
  fieldName: 'image',
}); */

const upload = uploadFiles({
  path: `${__dirname}/../../assets/uploads/business/`,
  maxCount: 10,
  fieldName: 'image',
});

router
  .route('/')
  .get(businessController.getAllBusinesses)
  .post(jwtAuth(), upload, businessController.createBusiness);

router.route('/trending').get(getTrendingBusinesses);
router.route('/nearest').get(getNearestBusinesses);
router.route('/highest-rated').get(getHighestRatedBusinesses);
router.route('/search').get(businessController.searchBusiness);

router
  .route('/:id')
  .get(businessController.getBusiness)
  .patch(businessController.updateBusiness)
  .delete(businessController.deleteBusiness);

export default router;
