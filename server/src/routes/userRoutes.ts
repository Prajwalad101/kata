import express from 'express';
import { getAllUsers, reportUser } from '../controllers/userController';

const router = express.Router();

router.route('/').get(getAllUsers);

router.route('/:id/report').patch(reportUser);

export default router;
