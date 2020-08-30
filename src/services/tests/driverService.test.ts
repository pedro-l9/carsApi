import * as DB from '../../repositories/memoryDB';
import { driverService } from '..';
import { Driver } from '../../types';

describe('Testing the driverService', () => {
  const DUMMY_DRIVER: Driver = Object.freeze({
    name: 'Pedro',
  });

  const DUMMY_ID = 1;

  describe('The addDriver function', () => {
    it('Should be able to add a driver to the database', () => {
      const driverDAO = { ...DUMMY_DRIVER, id: DUMMY_ID };
      const dbInsertSpy = jest.spyOn(DB, 'insert');
      dbInsertSpy.mockReturnValue(driverDAO);

      const insertedDriver = driverService.addDriver(DUMMY_DRIVER);

      expect(dbInsertSpy).toHaveBeenCalledTimes(1);
      expect(dbInsertSpy).toHaveBeenCalledWith('drivers', DUMMY_DRIVER);
      expect(insertedDriver).toEqual(driverDAO);
    });
  });

  describe('The updateDriver function', () => {
    it('Should be able to update an existing driver on the database', () => {
      const dbUpdateSpy = jest.spyOn(DB, 'update');

      const updateResponse = driverService.updateDriver(DUMMY_DRIVER, DUMMY_ID);

      expect(dbUpdateSpy).toHaveBeenCalledTimes(1);
      expect(dbUpdateSpy).toHaveBeenCalledWith(
        'drivers',
        DUMMY_DRIVER,
        DUMMY_ID
      );
      expect(updateResponse).toEqual(undefined);
    });
  });

  describe('The deleteDriver function', () => {
    it('Should be able to remove an existing driver from the database', () => {
      const dbRemoveSpy = jest.spyOn(DB, 'remove');

      const removeResponse = driverService.deleteDriver(DUMMY_ID);

      expect(dbRemoveSpy).toHaveBeenCalledTimes(1);
      expect(dbRemoveSpy).toHaveBeenCalledWith('drivers', DUMMY_ID);
      expect(removeResponse).toEqual(undefined);
    });
  });

  describe('The getDriver function', () => {
    it('Should return undefined when given the Id of a non-existing driver', () => {
      const dbGetSpy = jest.spyOn(DB, 'get');
      dbGetSpy.mockReturnValue(undefined);

      const retrievedDriver = driverService.getDriver(DUMMY_ID);

      expect(dbGetSpy).toHaveBeenCalledTimes(1);
      expect(dbGetSpy).toHaveBeenCalledWith('drivers', DUMMY_ID);
      expect(retrievedDriver).toEqual(undefined);
    });

    it('Should be able to get a specific driver from the database given it exists', () => {
      const driverDAO = { ...DUMMY_DRIVER, id: DUMMY_ID };
      const dbGetSpy = jest.spyOn(DB, 'get');
      dbGetSpy.mockReturnValue(driverDAO);

      const retrievedDriver = driverService.getDriver(DUMMY_ID);

      expect(dbGetSpy).toHaveBeenCalledTimes(1);
      expect(dbGetSpy).toHaveBeenCalledWith('drivers', DUMMY_ID);
      expect(retrievedDriver).toEqual(driverDAO);
    });
  });

  describe('The getAllDrivers function', () => {
    it('Should return all the drivers on the database', () => {
      const allDrivers = [{ ...DUMMY_DRIVER, id: DUMMY_ID }];
      const dbGetAllSpy = jest.spyOn(DB, 'getAll');
      dbGetAllSpy.mockReturnValue(allDrivers);

      const retrievedDrivers = driverService.getAllDrivers();

      expect(dbGetAllSpy).toHaveBeenCalledTimes(1);
      expect(dbGetAllSpy).toHaveBeenCalledWith('drivers');
      expect(retrievedDrivers).toEqual(allDrivers);
    });
  });
});
