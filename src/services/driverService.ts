import { Driver, DAO } from '../types';
import * as DB from '../repositories/memoryDB';

export function addDriver(driver: Driver): DAO<Driver> {
  return DB.insert('drivers', driver);
}

export function updateDriver(
  updateData: Partial<Driver>,
  driverId: number
): void {
  return DB.update('drivers', updateData, driverId);
}

export function deleteDriver(driverId: number): void {
  return DB.remove('drivers', driverId);
}

export function getDriver(driverId: number): DAO<Driver> | undefined {
  return DB.get('drivers', driverId);
}

export function getAllDrivers(): DAO<Driver>[] {
  return DB.getAll('drivers');
}
