import { Car, CarUsage, Driver, DAO } from '../types';

type Collection = 'cars' | 'drivers' | 'carUsages';
type Item = Car | Driver | CarUsage;

type KeyValStorage<T> = {
  [key: string]: T;
};

const collections = {
  cars: {} as KeyValStorage<Car>,
  drivers: {} as KeyValStorage<Driver>,
  carUsages: {} as KeyValStorage<CarUsage>,
};

export function insert<T extends Item>(
  collection: Collection,
  item: T
): DAO<T> {
  const collectionData = collections[collection];
  const itemId = Object.values(collectionData).length;

  collections[collection] = { ...collectionData, [itemId]: item };

  return {
    ...item,
    id: itemId,
  };
}

export function update<T extends Item>(
  collection: Collection,
  data: Partial<T>,
  itemId: number
): void {
  const collectionData = collections[collection];
  const currentItem: T | undefined = collectionData[itemId] as T;

  if (currentItem !== undefined) {
    const updatedItem: T = {
      ...currentItem,
      ...data,
    };

    collections[collection] = { ...collectionData, [itemId]: updatedItem };
  }
}

export function get<T extends Item>(
  collection: Collection,
  id: number
): undefined | DAO<T> {
  const item: T | undefined = collections[collection][id] as T;

  return item !== undefined ? { ...item, id } : undefined;
}

export function getAll<T extends Item>(collection: Collection): DAO<T>[] {
  return Object.values(collections[collection]).map(
    (item: T, index: number) => ({
      ...item,
      id: index,
    })
  );
}

export function remove(collection: Collection, id: number): void {
  delete collections[collection][id];
}
