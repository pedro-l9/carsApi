import { Car, DAO } from '../types';
import * as DB from '../repositories/memoryDB';

export function addCar(car: Car): DAO<Car> {
  return DB.insert('cars', car);
}

export function updateCar(updateData: Partial<Car>, carId: number): void {
  return DB.update('cars', updateData, carId);
}

export function deleteCar(carId: number): void {
  return DB.remove('cars', carId);
}

export function getCar(carId: number): DAO<Car> | undefined {
  return DB.get('cars', carId);
}

export function getAllCars(): DAO<Car>[] {
  return DB.getAll('cars');
}
