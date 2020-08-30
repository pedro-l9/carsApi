export type Car = {
  plate: string;
  color: string;
  brand: string;
};

export type Driver = {
  name: string;
};

export type CarUsage = {
  start: Date;
  finish?: Date;
  driverId: number;
  carPlate: string;
  usageDescription: string;
};

export type DAO<T> = T & {
  id: number;
};
