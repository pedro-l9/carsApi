import { DAO, CarUsageDAO, CarUsage } from '../types';

export function openUsage(
  driverId: number,
  carId: number,
  description: string
): DAO<CarUsageDAO> {
  console.log(driverId, carId, description);
  return {} as DAO<CarUsageDAO>;
}

export function finishUsage(usageId: number): void {
  console.log(usageId);
}

export function getAllUsages(): CarUsage[] {
  return [];
}
