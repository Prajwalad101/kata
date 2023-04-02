// create express router
import express from 'express';
import {
  getBusiness,
  getAllBusinesses,
} from '../../controllers/admin/adminBusinessController';
import businessController from '../../controllers/businessController';

const router = express.Router();

router.route('/').get(getAllBusinesses);
router
  .route('/:id')
  .get(getBusiness)
  .patch(businessController.updateBusiness)
  .delete(businessController.deleteBusiness);

export default router;
