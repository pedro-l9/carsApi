import { Request, Response } from 'express';

import { carService } from '../services';
import { createCarSchema, updateCarSchema } from './schemas';
import { Car } from '../types';
import { HTTPError } from '../errors';

export function getAllCars(_: Request, res: Response): void {
  const allCars = carService.getAllCars();

  res.json(allCars);
}

export function getCar(req: Request, res: Response): void {
  const carId = req.params['carId'];

  if (!carId) throw new HTTPError('Bad request\n\nMissing carId', 400);

  const car = carService.getCar(parseInt(carId));

  if (car) res.status(200).json(car);
  else res.status(404).send(`No car with id "${carId}"`);
}

export async function createCar(req: Request, res: Response): Promise<void> {
  const car: Car = await createCarSchema.validateAsync(req.body, {
    abortEarly: false,
  });

  const createdCar = carService.addCar(car);

  res.status(201).json(createdCar);
}

export async function updateCar(req: Request, res: Response): Promise<void> {
  const carId = req.params['carId'];
  const updateData = await updateCarSchema.validateAsync(req.body, {
    abortEarly: false,
  });

  if (!carId) throw new HTTPError('Bad request\n\nMissing carId', 400);

  carService.updateCar(updateData, parseInt(carId));
  res.sendStatus(204);
}

export function deleteCar(req: Request, res: Response): void {
  const carId = req.params['carId'];

  if (!carId) throw new HTTPError('Bad request\n\nMissing carId', 400);

  carService.deleteCar(parseInt(carId));
  res.sendStatus(204);
}
