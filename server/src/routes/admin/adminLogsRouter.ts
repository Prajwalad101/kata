import express from 'express';
import { getLogs } from '../../controllers/admin/adminLogsController';

const router = express.Router();

router.route('/').get(getLogs);

export default router;
