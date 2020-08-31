import { Request, Response } from 'express';

import { carUsageService } from '../services';
import { CarUsageRequest } from '../types';

export function openUsage(req: Request, res: Response): void {
  const { driverId, carId, description }: CarUsageRequest = req.body;

  const usage = carUsageService.openUsage(driverId, carId, description);

  res.status(201).json(usage);
}

export function finishUsage(req: Request, res: Response): void {
  const usageId = req.params['usageId'];

  if (usageId) {
    carUsageService.finishUsage(parseInt(usageId));
    res.sendStatus(204);
  } else {
    res.status(400).send('Missing usageId');
  }
}

export function getAllUsages(_: Request, res: Response): void {
  const allUsages = carUsageService.getAllUsages();

  res.json(allUsages);
}
