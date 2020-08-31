import express from 'express';

import { carsController } from '../controllers';
import errorWrapper from '../utils/errorWrapper';

const router = express.Router();

router.get('/', errorWrapper(carsController.getAllCars));
router.get('/:carId', errorWrapper(carsController.getCar));
router.post('/', errorWrapper(carsController.createCar));
router.put('/:carId', errorWrapper(carsController.updateCar));
router.delete('/:carId', errorWrapper(carsController.deleteCar));

export default router;
