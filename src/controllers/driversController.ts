import { Request, Response } from 'express';

import { driverService } from '../services';
import { Driver } from '../types';
import { createDriverSchema, updateDriverSchema } from './schemas';
import { HTTPError } from '../errors';

export function getAllDrivers(_: Request, res: Response): void {
  const allDrivers = driverService.getAllDrivers();

  res.json(allDrivers);
}

export function getDriver(req: Request, res: Response): void {
  const driverId = req.params['driverId'];

  if (!driverId) throw new HTTPError('Bad request\n\nMissing driverId', 400);

  const driver = driverService.getDriver(parseInt(driverId));

  if (driver) res.status(200).json(driver);
  else res.status(404).send(`No driver with id "${driverId}"`);
}

export async function createDriver(req: Request, res: Response): Promise<void> {
  const driver: Driver = await createDriverSchema.validateAsync(req.body, {
    abortEarly: false,
  });

  const createdDriver = driverService.addDriver(driver);

  res.status(201).json(createdDriver);
}

export async function updateDriver(req: Request, res: Response): Promise<void> {
  const driverId = req.params['driverId'];
  const updateData = await updateDriverSchema.validateAsync(req.body, {
    abortEarly: false,
  });

  if (!driverId) throw new HTTPError('Bad request\n\nMissing driverId', 400);

  driverService.updateDriver(updateData, parseInt(driverId));
  res.sendStatus(204);
}

export function deleteDriver(req: Request, res: Response): void {
  const driverId = req.params['driverId'];

  if (!driverId) throw new HTTPError('Bad request\n\nMissing driverId', 400);

  driverService.deleteDriver(parseInt(driverId));
  res.sendStatus(204);
}
