import { Car } from '../../types';
import * as DB from '../../repositories/memoryDB';
import { carService } from '../';

describe('Testing the carService', () => {
  const DUMMY_CAR: Car = Object.freeze({
    plate: 'ABC1234',
    color: 'red',
    brand: 'Toyota',
  });

  const DUMMY_ID = 1;

  describe('The addCar function', () => {
    it('Should be able to add a car to the database', () => {
      const carDAO = { ...DUMMY_CAR, id: DUMMY_ID };
      const dbInsertSpy = jest.spyOn(DB, 'insert');
      dbInsertSpy.mockReturnValue(carDAO);

      const insertedCar = carService.addCar(DUMMY_CAR);

      expect(dbInsertSpy).toHaveBeenCalledTimes(1);
      expect(dbInsertSpy).toHaveBeenCalledWith('cars', DUMMY_CAR);
      expect(insertedCar).toEqual(carDAO);
    });
  });

  describe('The updateCar function', () => {
    it('Should be able to update an existing car on the database', () => {
      const dbUpdateSpy = jest.spyOn(DB, 'update');

      const updateResponse = carService.updateCar(DUMMY_CAR, DUMMY_ID);

      expect(dbUpdateSpy).toHaveBeenCalledTimes(1);
      expect(dbUpdateSpy).toHaveBeenCalledWith('cars', DUMMY_CAR, DUMMY_ID);
      expect(updateResponse).toEqual(undefined);
    });
  });

  describe('The deleteCar function', () => {
    it('Should be able to remove an existing car on the database', () => {
      const dbRemoveSpy = jest.spyOn(DB, 'remove');

      const removeResponse = carService.deleteCar(DUMMY_ID);

      expect(dbRemoveSpy).toHaveBeenCalledTimes(1);
      expect(dbRemoveSpy).toHaveBeenCalledWith('cars', DUMMY_ID);
      expect(removeResponse).toEqual(undefined);
    });
  });

  describe('The getCar function', () => {
    it('Should return undefined when given the Id of a non-existing car', () => {
      const dbGetSpy = jest.spyOn(DB, 'get');
      dbGetSpy.mockReturnValue(undefined);

      const retrievedCar = carService.getCar(DUMMY_ID);

      expect(dbGetSpy).toHaveBeenCalledTimes(1);
      expect(dbGetSpy).toHaveBeenCalledWith('cars', DUMMY_ID);
      expect(retrievedCar).toEqual(undefined);
    });

    it('Should be able to get a specific car from the database given it exists', () => {
      const carDAO = { ...DUMMY_CAR, id: DUMMY_ID };
      const dbGetSpy = jest.spyOn(DB, 'get');
      dbGetSpy.mockReturnValue(carDAO);

      const retrievedCar = carService.getCar(DUMMY_ID);

      expect(dbGetSpy).toHaveBeenCalledTimes(1);
      expect(dbGetSpy).toHaveBeenCalledWith('cars', DUMMY_ID);
      expect(retrievedCar).toEqual(carDAO);
    });
  });

  describe('The getAllCars function', () => {
    it('Should return all the cars on the database', () => {
      const allCars = [{ ...DUMMY_CAR, id: DUMMY_ID }];
      const dbGetAllSpy = jest.spyOn(DB, 'getAll');
      dbGetAllSpy.mockReturnValue(allCars);

      const retrievedCars = carService.getAllCars();

      expect(dbGetAllSpy).toHaveBeenCalledTimes(1);
      expect(dbGetAllSpy).toHaveBeenCalledWith('cars');
      expect(retrievedCars).toEqual(allCars);
    });
  });
});
