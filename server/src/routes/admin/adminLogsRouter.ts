import express from 'express';
import { getLog, getLogs } from '../../controllers/admin/adminLogsController';

const router = express.Router();

router.route('/').get(getLogs);
router.route('/:id').get(getLog);

export default router;
