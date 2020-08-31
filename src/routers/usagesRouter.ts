import express from 'express';

import { usagesController } from '../controllers';
import errorWrapper from '../utils/errorWrapper';

const router = express.Router();

router.get('/', errorWrapper(usagesController.getAllUsages));
router.post('/', errorWrapper(usagesController.openUsage));
router.put('/:usageId', errorWrapper(usagesController.finishUsage));

export default router;
