import express from 'express';
import businessController, {
  getNearestBusinesses,
  getTrendingBusinesses,
} from '../controllers/businessController';
import uploadFiles from '../utils/multer/uploadFiles';

const router = express.Router();

const upload = uploadFiles({
  path: '../client/public/uploads/images/business/',
  maxCount: 30,
  fieldName: 'image',
});

router
  .route('/')
  .get(businessController.getAllBusinesses)
  .post(upload, businessController.createBusiness);

router.route('/trending').get(getTrendingBusinesses);
router.route('/nearest').get(getNearestBusinesses);
router.route('/search').get(businessController.searchBusiness);

router
  .route('/:id')
  .get(businessController.getBusiness)
  .patch(businessController.updateBusiness)
  .delete(businessController.deleteBusiness);

export default router;
