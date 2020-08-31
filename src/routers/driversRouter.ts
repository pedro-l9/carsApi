import express from 'express';

import { driversController } from '../controllers';
import errorWrapper from '../utils/errorWrapper';

const router = express.Router();

router.get('/', errorWrapper(driversController.getAllDrivers));
router.get('/:driverId', errorWrapper(driversController.getDriver));
router.post('/', errorWrapper(driversController.createDriver));
router.put('/:driverId', errorWrapper(driversController.updateDriver));
router.delete('/:driverId', errorWrapper(driversController.deleteDriver));

export default router;
