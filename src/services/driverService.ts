import { Driver, DAO } from '../types';

export function addDriver(driver: Driver): DAO<Driver> {
  console.log(driver);
  return {} as DAO<Driver>;
}

export function updateDriver(
  updateData: Partial<Driver>,
  driverId: number
): void {
  console.log(updateData, driverId);
}

export function deleteDriver(driverId: number): void {
  console.log(driverId);
}

export function getDriver(driverId: number): DAO<Driver> | undefined {
  console.log(driverId);
  return;
}

export function getAllDrivers(): DAO<Driver>[] {
  return [];
}
