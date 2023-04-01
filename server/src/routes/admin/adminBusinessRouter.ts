// create express router
import express from 'express';
import businessController from '../../controllers/businessController';

const router = express.Router();

router.route('/').get(businessController.getAllBusinesses);

router.route('/show/:id').get(businessController.getBusiness);

export default router;
