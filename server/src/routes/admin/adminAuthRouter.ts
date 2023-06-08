// create express router
import express from 'express';
import { handleAdminLogin } from '../../controllers/admin/adminAuthController';

const router = express.Router();

router.route('/login').post(handleAdminLogin);

export default router;
