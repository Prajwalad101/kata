import express from 'express';
import { getUser } from '../controllers/admin/adminUserController';
import { getAllUsers, reportUser } from '../controllers/userController';

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser);

router.route('/:id/report').patch(reportUser);

export default router;
