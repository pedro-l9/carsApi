import { Car, DAO } from '../types';

export function addCar(car: Car): DAO<Car> {
  console.log(car);
  return {} as DAO<Car>;
}

export function updateCar(updateData: Partial<Car>, carId: number): void {
  console.log(updateData, carId);
  return;
}

export function deleteCar(carId: number): void {
  console.log(carId);
  return;
}

export function getCar(carId: number): DAO<Car> | undefined {
  console.log(carId);
  return {} as DAO<Car>;
}

export function getAllCars(): DAO<Car>[] {
  return [];
}
