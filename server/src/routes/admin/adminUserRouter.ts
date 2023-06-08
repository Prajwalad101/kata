import express from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
} from '../../controllers/admin/adminUserController';

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser);

export default router;
