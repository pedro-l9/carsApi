export type Car = {
  plate: string;
  color: string;
  brand: string;
};

export type Driver = {
  name: string;
};

export type CarUsage = {
  start: number;
  finish?: number;
  driverId: number;
  carId: number;
  description: string;
};

export type CarUsageResponse = {
  id: number;
  start: number;
  finish?: number;
  driver: DAO<Driver>;
  car: DAO<Car>;
  description: string;
};

export type DAO<T> = T & {
  id: number;
};
