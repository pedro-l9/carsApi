import express from 'express';

import {
  carsController,
  driversController,
  usagesController,
} from './controllers';
import errorWrapper from './utils/errorWrapper';

const router = express.Router();

router.get('/cars', errorWrapper(carsController.getAllCars));
router.get('/cars/:carId', errorWrapper(carsController.getCar));
router.post('/cars', errorWrapper(carsController.createCar));
router.put('/cars/:carId', errorWrapper(carsController.updateCar));
router.delete('/cars/:carId', errorWrapper(carsController.deleteCar));

router.get('/drivers', errorWrapper(driversController.getAllDrivers));
router.get('/drivers/:driverId', errorWrapper(driversController.getDriver));
router.post('/drivers', errorWrapper(driversController.createDriver));
router.put('/drivers/:driverId', errorWrapper(driversController.updateDriver));
router.delete(
  '/drivers/:driverId',
  errorWrapper(driversController.deleteDriver)
);

router.get('/usages', errorWrapper(usagesController.getAllUsages));
router.post('/usages', errorWrapper(usagesController.openUsage));
router.put('/usages/:usageId', errorWrapper(usagesController.finishUsage));

export default router;
