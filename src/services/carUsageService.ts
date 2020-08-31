import { DAO, CarUsage, CarUsageResponse, Car, Driver } from '../types';
import * as DB from '../repositories/memoryDB';
import {
  CarAlreadyInUse,
  UsageAlreadyOpen,
  NoCarWithId,
  NoDriverWithId,
} from '../errors';

export function openUsage(
  driverId: number,
  carId: number,
  description: string
): DAO<CarUsage> {
  DB.getAll<CarUsage>('carUsages').forEach((usage) => {
    if (usage.finish === undefined) {
      if (usage.driverId === driverId) throw new UsageAlreadyOpen();
      if (usage.carId === carId) throw new CarAlreadyInUse();
    }
  });

  const referredCar = DB.get('cars', carId);
  const referredDriver = DB.get('drivers', driverId);

  if (referredCar === undefined) throw new NoCarWithId(carId);
  if (referredDriver === undefined) throw new NoDriverWithId(driverId);

  return DB.insert<CarUsage>('carUsages', {
    start: Date.now(),
    driverId,
    carId,
    description,
  });
}

export function finishUsage(usageId: number): void {
  return DB.update('carUsages', { finish: Date.now() }, usageId);
}

export function getAllUsages(): CarUsageResponse[] {
  const drivers = DB.getAll<Driver>('drivers');
  const cars = DB.getAll<Car>('cars');
  const usages = DB.getAll<CarUsage>('carUsages');

  return usages
    .map<CarUsageResponse | undefined>((usage) => {
      const { driverId, carId, ...cleanUsage } = usage;
      const driver = drivers.find(({ id }) => id === driverId);
      const car = cars.find(({ id }) => id === carId);

      if (driver === undefined || car === undefined) return undefined;

      return {
        ...cleanUsage,
        driver,
        car,
      };
    })
    .filter<CarUsageResponse>(
      (usage: CarUsageResponse | undefined): usage is CarUsageResponse =>
        usage !== undefined
    );
}
