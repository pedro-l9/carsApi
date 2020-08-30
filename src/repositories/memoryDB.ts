import { Car, CarUsage, Driver, DAO } from '../types';

export type Collection = 'cars' | 'drivers' | 'carUsages';
export type Data = Partial<Car | Driver | CarUsage>;
export type Item = Car | Driver | CarUsage;
export type IdentifiedItem = DAO<Car | Driver | CarUsage>;

type KeyValCollectionStorage = {
  [key: string]: KeyValStorage;
};

type KeyValStorage = {
  [key: string]: Item;
};

const collections: KeyValCollectionStorage = {
  cars: {},
  drivers: {},
  carUsages: {},
};

export function insert(collection: Collection, item: Item): IdentifiedItem {
  const collectionData = collections[collection];
  const itemId = Object.values(collectionData).length;

  collections[collection] = { ...collectionData, [itemId]: item };

  return {
    ...item,
    id: itemId,
  };
}

export function update(
  collection: Collection,
  data: Data,
  itemId: number
): void {
  const collectionData = collections[collection];
  const currentItem: Item | undefined = collectionData[itemId];

  if (currentItem !== undefined) {
    const newItem: Item = {
      ...currentItem,
      ...data,
    };

    collections[collection] = { ...collectionData, [itemId]: newItem };
  }
}

export function get(
  collection: Collection,
  id: number
): IdentifiedItem | undefined {
  const item: Item | undefined = collections[collection][id];

  return item !== undefined ? { ...item, id } : undefined;
}

export function getAll(collection: Collection): Array<IdentifiedItem> {
  return Object.values(collections[collection]).map((item, index) => ({
    ...item,
    id: index,
  }));
}
