import express from 'express';
import businessController from '../controllers/businessController';
import uploadFiles from '../utils/multer/uploadFiles';

const router = express.Router();

const upload = uploadFiles({
  path: '../client/public/uploads/images/business/',
  maxCount: 20,
  fieldName: 'image',
});

router
  .route('/')
  .get(businessController.getAllBusinesses)
  .post(upload, businessController.createBusiness);

router.route('/search').get(businessController.searchBusiness);

router
  .route('/:id')
  .get(businessController.getBusiness)
  .patch(businessController.updateBusiness)
  .delete(businessController.deleteBusiness);

export default router;
