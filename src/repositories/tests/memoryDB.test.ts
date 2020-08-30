import * as DB from '../memoryDB';
import { Driver } from '../../types';

describe('Testing the memoryDB database mockup', () => {
  const DUMMY_DRIVER: Driver = Object.freeze({ name: 'Pedro' });

  describe('The insert function of the database', () => {
    it('Should insert an Item into the specified collection and return the identified item', () => {
      const identifiedDriver = DB.insert('drivers', DUMMY_DRIVER);
      const allDrivers = DB.getAll('drivers');

      expect(identifiedDriver).toHaveProperty('id');
      expect(allDrivers).toContainEqual(identifiedDriver);
    });
  });

  describe('The update function of the database', () => {
    const UPDATED_DRIVER_DATA = Object.freeze({ name: 'Paulo' });

    it('Should do nothing when updating a value that does not exist', () => {
      const DUMMY_ID = 1;
      DB.remove('drivers', DUMMY_ID);

      const beforeUpdate = DB.getAll('drivers');
      DB.update<Driver>('drivers', UPDATED_DRIVER_DATA, DUMMY_ID);
      const afterUpdate = DB.getAll('drivers');

      expect(beforeUpdate).toEqual(afterUpdate);
    });

    it('Should update a previously inserted Item from the collection given there is already an item with the specified id', () => {
      const { id: driverId } = DB.insert<Driver>('drivers', DUMMY_DRIVER);

      DB.update<Driver>('drivers', UPDATED_DRIVER_DATA, driverId);

      const updatedDriver = DB.get<Driver>('drivers', driverId);

      expect(updatedDriver?.name).toEqual(UPDATED_DRIVER_DATA.name);
      expect(updatedDriver?.id).toEqual(driverId);
    });
  });

  describe('The get function of the database', () => {
    it('Should return undefined when given the Id of an Item that was not created', () => {
      const DUMMY_ID = 1;
      DB.remove('drivers', DUMMY_ID);

      const item = DB.get('drivers', DUMMY_ID);

      expect(item).toEqual(undefined);
    });

    it('Should retrieve an Item by its Id given there is an Item created with such Id', () => {
      const existingItem = DB.insert('drivers', DUMMY_DRIVER);

      const retrievedItem = DB.get('drivers', existingItem.id);

      expect(retrievedItem).toEqual(existingItem);
    });
  });

  describe('The getAll function of the database', () => {
    it('Should return all the items in a specific collection', () => {
      const allItems = DB.getAll('drivers');

      expect(allItems).not.toEqual(undefined);
    });
  });

  describe('The remove function of the database', () => {
    it('Should do nothing when deleting a value that does not exist ', () => {
      const DUMMY_ID = 1;
      DB.remove('drivers', DUMMY_ID);

      const beforeUpdate = DB.getAll('drivers');
      DB.remove('drivers', DUMMY_ID);
      const afterUpdate = DB.getAll('drivers');

      expect(beforeUpdate).toEqual(afterUpdate);
    });

    it('Should delete an existing value from a collection given its Id', () => {
      const existingItem = DB.insert<Driver>('drivers', DUMMY_DRIVER);

      DB.remove('drivers', existingItem.id);

      const allItems = DB.getAll<Driver>('drivers');

      expect(allItems).not.toContain(existingItem);
    });
  });
});
