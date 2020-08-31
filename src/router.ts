import express from 'express';

import {
  carsController,
  driversController,
  usagesController,
} from './controllers';

const router = express.Router();

router.get('/cars', carsController.getAllCars);
router.get('/cars/:carId', carsController.getCar);
router.post('/cars', carsController.createCar);
router.put('/cars/:carId', carsController.updateCar);
router.delete('/cars/:carId', carsController.deleteCar);

router.get('/drivers', driversController.getAllDrivers);
router.get('/drivers/:driverId', driversController.getDriver);
router.post('/drivers', driversController.createDriver);
router.put('/drivers/:driverId', driversController.updateDriver);
router.delete('/drivers/:driverId', driversController.deleteDriver);

router.get('/usages', usagesController.getAllUsages);
router.post('/usages', usagesController.openUsage);
router.put('/usages/:usageId', usagesController.finishUsage);

export default router;
