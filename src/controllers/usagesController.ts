import { Request, Response } from 'express';

import { carUsageService } from '../services';
import { CarUsageRequest } from '../types';
import { createUsageSchema } from './schemas';
import { HTTPError } from '../errors';

export async function openUsage(req: Request, res: Response): Promise<void> {
  const {
    driverId,
    carId,
    description,
  }: CarUsageRequest = await createUsageSchema.validateAsync(req.body, {
    abortEarly: false,
  });

  const usage = carUsageService.openUsage(driverId, carId, description);

  res.status(201).json(usage);
}

export function finishUsage(req: Request, res: Response): void {
  const usageId = req.params['usageId'];

  if (!usageId) throw new HTTPError('Bad request\n\nMissing usageId', 400);

  carUsageService.finishUsage(parseInt(usageId));
  res.sendStatus(204);
}

export function getAllUsages(_: Request, res: Response): void {
  const allUsages = carUsageService.getAllUsages();

  res.json(allUsages);
}
