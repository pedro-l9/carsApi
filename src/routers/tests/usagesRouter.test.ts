import request from 'supertest';

import app, { server } from '../..';

import * as DB from '../../repositories/memoryDB';
import { DAO, Car, CarUsage, Driver } from '../../types';

const DUMMY_OPEN_USAGE: DAO<CarUsage> = Object.freeze({
  id: 2,
  start: 1598816938448,
  driverId: 1,
  carId: 3,
  description: 'Needed the car for work',
});

const DUMMY_CLOSED_USAGE: DAO<CarUsage> = Object.freeze({
  id: 3,
  start: 1598816938448,
  finish: 1598819938448,
  driverId: 99,
  carId: 99,
  description: 'Was necessary',
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

afterAll(() => {
  server.close();
});

describe('POST /api/usages - Create a usage', () => {
  it('Should reject calls with missing properties with a Bad request', () => {
    const { start: _, id: usageId, ...cleanUsage } = DUMMY_OPEN_USAGE;
    const { carId: __, ...usageWithoutCarId } = cleanUsage;

    return request(app)
      .post('/api/usages')
      .send(usageWithoutCarId)
      .expect('Content-Type', /text/)
      .expect(400, `Bad request\n\n"carId" is required`);
  });

  it('Should not allow the creation of a usage for a driver that does not exist', async () => {
    const { start: _, id: usageId, ...cleanUsage } = DUMMY_OPEN_USAGE;
    jest
      .spyOn(DB, 'get')
      .mockImplementation((collection) =>
        collection === 'drivers' ? undefined : DUMMY_CAR_1
      );

    return request(app)
      .post('/api/usages')
      .send(cleanUsage)
      .expect('Content-Type', /text/)
      .expect(400, `There is no driver with the id ${cleanUsage.driverId}`);
  });

  it('Should not allow the creation of a usage for a car that does not exist', async () => {
    const { start: _, id: usageId, ...cleanUsage } = DUMMY_OPEN_USAGE;
    jest
      .spyOn(DB, 'get')
      .mockImplementation((collection) =>
        collection === 'cars' ? undefined : DUMMY_DRIVER_1
      );

    return request(app)
      .post('/api/usages')
      .send(cleanUsage)
      .expect('Content-Type', /text/)
      .expect(400, `There is no car with the id ${cleanUsage.carId}`);
  });

  it('Should add a usage to the database', async () => {
    const mockNow = 1598816938448;
    jest.spyOn(Date, 'now').mockReturnValue(mockNow);

    const dbInsertSpy = jest.spyOn(DB, 'insert');
    dbInsertSpy.mockReturnValue(DUMMY_OPEN_USAGE);

    jest.spyOn(DB, 'get').mockImplementation((collection) => {
      if (collection === 'drivers') return DUMMY_DRIVER_1;
      if (collection === 'cars') return DUMMY_CAR_1;
    });
    const { start: _, id: usageId, ...cleanUsage } = DUMMY_OPEN_USAGE;

    return request(app)
      .post('/api/usages')
      .send(cleanUsage)
      .expect('Content-Type', /json/)
      .expect(201, DUMMY_OPEN_USAGE)
      .then(() => {
        expect(dbInsertSpy).toHaveBeenCalledTimes(1);
        expect(dbInsertSpy).toHaveBeenCalledWith('carUsages', {
          ...cleanUsage,
          start: mockNow,
        });
      });
  });
});

describe('GET /api/usages - Get all usages', () => {
  it('Should return all the usages in the database', async () => {
    const { driverId: _, carId: __, ...cleanUsage } = DUMMY_OPEN_USAGE;

    jest.spyOn(DB, 'getAll').mockImplementation((collection) => {
      switch (collection) {
        case 'drivers':
          return [DUMMY_DRIVER_1, DUMMY_DRIVER_2];
        case 'cars':
          return [DUMMY_CAR_1, DUMMY_CAR_2];
        case 'carUsages':
          return [DUMMY_OPEN_USAGE, DUMMY_CLOSED_USAGE];
      }
    });

    const { body } = await request(app)
      .get('/api/usages')
      .expect('Content-Type', /json/)
      .expect(200, [
        { ...cleanUsage, driver: DUMMY_DRIVER_1, car: DUMMY_CAR_1 },
      ]);
  });
});

describe('PUT /api/usages/:usageId - Finish a usage', () => {
  it('Should update the usage with the finish date as the current time', async () => {
    const mockNow = 1598816938448;
    const usageId = 1;
    jest.spyOn(Date, 'now').mockReturnValue(mockNow);

    const dbUpdateSpy = jest.spyOn(DB, 'update');
    dbUpdateSpy.mockReturnValue(undefined);

    return request(app)
      .put(`/api/usages/${usageId}`)
      .expect(204)
      .then(() => {
        expect(dbUpdateSpy).toHaveBeenCalledTimes(1);
        expect(dbUpdateSpy).toHaveBeenCalledWith(
          'carUsages',
          { finish: mockNow },
          usageId
        );
      });
  });
});
