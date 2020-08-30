export type Car = {
  plate: string;
  color: string;
  brand: string;
};

export type Driver = {
  name: string;
};

export type CarUsageDAO = {
  id: number;
  start: number;
  finish?: number;
  driverId: number;
  carId: number;
  description: string;
};

export type CarUsage = {
  id: number;
  start: number;
  finish: number;
  driver: Driver;
  car: Car;
  description: string;
};

export type DAO<T> = T & {
  id: number;
};
