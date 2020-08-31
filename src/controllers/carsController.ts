import { Request, Response } from 'express';

import { carService } from '../services';
import { Car } from '../types';

export function getAllCars(_: Request, res: Response): void {
  const allCars = carService.getAllCars();

  res.json(allCars);
}

export function getCar(req: Request, res: Response): void {
  const carId = req.params['carId'];

  if (carId) {
    const car = carService.getCar(parseInt(carId));
    res.status(200).json(car);
  } else {
    res.status(400).send('Missing carId');
  }
}

export function createCar(req: Request, res: Response): void {
  const car: Car = req.body;

  const createdCar = carService.addCar(car);

  res.status(201).json(createdCar);
}

export function updateCar(req: Request, res: Response): void {
  const carId = req.params['carId'];
  const updateData = req.body;

  if (carId && updateData) {
    carService.updateCar(updateData, parseInt(carId));
    res.sendStatus(204);
  } else {
    res.status(400).send('Missing carId');
  }
}

export function deleteCar(req: Request, res: Response): void {
  const carId = req.params['carId'];

  if (carId) {
    carService.deleteCar(parseInt(carId));
    res.sendStatus(204);
  } else {
    res.status(400).send('Missing carId');
  }
}
