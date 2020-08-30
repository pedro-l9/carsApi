import * as DB from '../../repositories/memoryDB';
import { carUsageService } from '../';
import { CarUsageDAO, DAO, Driver, Car } from '../../types';
import { UsageAlreadyOpen, CarAlreadyInUse } from '../../errors';

describe('Testing the carUsageService', () => {
  const DUMMY_OPEN_USAGE: CarUsageDAO = Object.freeze({
    id: 2,
    start: 1598816938448,
    driverId: 1,
    carId: 3,
    description: '',
  });

  const DUMMY_DRIVER_1: DAO<Driver> = Object.freeze({
    id: 1,
    name: 'Pedro',
  });

  const DUMMY_DRIVER_2: DAO<Driver> = Object.freeze({
    id: 2,
    name: 'João',
  });

  const DUMMY_CAR_1: DAO<Car> = Object.freeze({
    id: 3,
    plate: 'ABC1234',
    color: 'red',
    brand: 'Toyota',
  });

  const DUMMY_CAR_2: DAO<Car> = Object.freeze({
    id: 4,
    plate: 'ABC1235',
    color: 'blue',
    brand: 'Fiat',
  });

  describe('The openUsage function', () => {
    it('Should throw an error when a driver tries to take more than one car', () => {
      const dbGetAllSpy = jest.spyOn(DB, 'getAll');
      dbGetAllSpy.mockReturnValue([DUMMY_OPEN_USAGE]);

      expect(
        carUsageService.openUsage(DUMMY_DRIVER_1.id, DUMMY_CAR_1.id, '')
      ).toThrow(UsageAlreadyOpen);
    });

    it('Should thrown an error when a driver tries to take an already taken car', () => {
      const dbGetAllSpy = jest.spyOn(DB, 'getAll');
      dbGetAllSpy.mockReturnValue([DUMMY_OPEN_USAGE]);

      expect(
        carUsageService.openUsage(DUMMY_DRIVER_2.id, DUMMY_CAR_1.id, '')
      ).toThrow(CarAlreadyInUse);
    });

    it(`Should create a new usage record on the database
        given the car is not in use 
        and the driver does not have any usage open`, () => {
      const mockNow = 1598816938448;
      const dateNowSpy = jest.spyOn(Date, 'now');
      dateNowSpy.mockReturnValue(mockNow);

      const dbInsertSpy = jest.spyOn(DB, 'insert');
      const dbGetAllSpy = jest.spyOn(DB, 'getAll');
      dbGetAllSpy.mockReturnValue([DUMMY_OPEN_USAGE]);

      const expectedUsage = {
        start: mockNow,
        driverId: DUMMY_DRIVER_2.id,
        carId: DUMMY_CAR_2.id,
        description: '',
      };

      const newUsage = carUsageService.openUsage(
        DUMMY_DRIVER_2.id,
        DUMMY_CAR_2.id,
        ''
      );

      expect(dbInsertSpy).toHaveBeenCalledTimes(1);
      expect(dbInsertSpy).toHaveBeenCalledWith('carUsages', expectedUsage);
      expect(newUsage).toEqual(expectedUsage);
    });
  });

  describe('The finishUsage function', () => {
    it('Should finish a usage record given its Id', () => {
      const mockNow = 1598819802235;
      const dateNowSpy = jest.spyOn(Date, 'now');
      dateNowSpy.mockReturnValue(mockNow);

      const dbUpdateSpy = jest.spyOn(DB, 'update');

      const finishUsageResponse = carUsageService.finishUsage(
        DUMMY_OPEN_USAGE.id
      );

      expect(finishUsageResponse).toEqual(undefined);
      expect(dbUpdateSpy).toHaveBeenCalledTimes(1);
      expect(dbUpdateSpy).toHaveBeenCalledWith(
        'carUsages',
        {
          finish: mockNow,
        },
        DUMMY_OPEN_USAGE.id
      );
    });
  });

  describe('The getAllUsages function', () => {
    it(`Should return all the usages in the database 
    with the data from the drivers and cars joined in`, () => {
      const dbGetAllSpy = jest.spyOn(DB, 'getAll');
      dbGetAllSpy.mockImplementation((collection) => {
        switch (collection) {
          case 'cars':
            return [DUMMY_DRIVER_1, DUMMY_DRIVER_2];
          case 'drivers':
            return [DUMMY_CAR_1, DUMMY_CAR_2];
          case 'carUsages':
            return [DUMMY_OPEN_USAGE];
        }
      });

      const { id, start, finish, description } = DUMMY_OPEN_USAGE;

      const expectedUsage = {
        id,
        start,
        finish,
        description,
        driver: DUMMY_DRIVER_1,
        car: DUMMY_CAR_1,
      };

      const allUsages = carUsageService.getAllUsages();

      expect(allUsages).toEqual([expectedUsage]);
    });
  });
});
