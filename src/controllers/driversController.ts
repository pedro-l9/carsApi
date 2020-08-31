import { Request, Response } from 'express';

import { driverService } from '../services';
import { Driver } from '../types';

export function getAllDrivers(_: Request, res: Response): void {
  const allDrivers = driverService.getAllDrivers();

  res.json(allDrivers);
}

export function getDriver(req: Request, res: Response): void {
  const driverId = req.params['driverId'];

  if (driverId) {
    const driver = driverService.getDriver(parseInt(driverId));
    res.status(200).json(driver);
  } else {
    res.status(400).send('Missing driverId');
  }
}

export function createDriver(req: Request, res: Response): void {
  const driver: Driver = req.body;

  const createdDriver = driverService.addDriver(driver);

  res.status(201).json(createdDriver);
}

export function updateDriver(req: Request, res: Response): void {
  const driverId = req.params['driverId'];
  const updateData = req.body;

  if (driverId && updateData) {
    driverService.updateDriver(updateData, parseInt(driverId));
    res.sendStatus(204);
  } else {
    res.status(400).send('Missing carId');
  }
}

export function deleteDriver(req: Request, res: Response): void {
  const driverId = req.params['driverId'];

  if (driverId) {
    driverService.deleteDriver(parseInt(driverId));
    res.sendStatus(204);
  } else {
    res.status(400).send('Missing driverId');
  }
}
