import request from 'supertest';

import app, { server } from '../..';

import * as DB from '../../repositories/memoryDB';
import { DAO, Car } from '../../types';

const DUMMY_CAR: DAO<Car> = Object.freeze({
  id: 0,
  plate: 'ABC1234',
  color: 'red',
  brand: 'Toyota',
});

afterAll(() => {
  server.close();
});

describe('GET /api/cars - Get all cars', () => {
  it('Should return all the cars in the database', () => {
    jest.spyOn(DB, 'getAll').mockReturnValue([DUMMY_CAR]);

    return request(app)
      .get('/api/cars')
      .expect('Content-Type', /json/)
      .expect(200, [DUMMY_CAR]);
  });
});

describe('GET /api/cars/:carId - Get a specific car', () => {
  it('Should return error 404 with the text "No car with id "${carId}"" when there is no car with the passed Id', () => {
    jest.spyOn(DB, 'get').mockReturnValue(undefined);

    return request(app)
      .get(`/api/cars/${DUMMY_CAR.id}`)
      .expect('Content-Type', /text/)
      .expect(404, `No car with id "${DUMMY_CAR.id}"`);
  });

  it('Should return a car given its Id', () => {
    jest.spyOn(DB, 'get').mockReturnValue(DUMMY_CAR);

    return request(app)
      .get(`/api/cars/${DUMMY_CAR.id}`)
      .expect('Content-Type', /json/)
      .expect(200, DUMMY_CAR);
  });
});

describe('POST /api/cars - Create a car', () => {
  it('Should reject calls with missing properties with a Bad request', () => {
    const { id: carId, plate: _, ...carWithoutPlate } = DUMMY_CAR;

    return request(app)
      .post('/api/cars')
      .send(carWithoutPlate)
      .expect('Content-Type', /text/)
      .expect(400, `Bad request\n\n"plate" is required`);
  });

  it('Should add a car to the database', async () => {
    const dbInsertSpy = jest.spyOn(DB, 'insert');
    dbInsertSpy.mockReturnValue(DUMMY_CAR);
    const { id: carId, ...mockCar } = DUMMY_CAR;

    return request(app)
      .post('/api/cars')
      .send(mockCar)
      .expect('Content-Type', /json/)
      .expect(201, DUMMY_CAR)
      .then(() => {
        expect(dbInsertSpy).toHaveBeenCalledTimes(1);
        expect(dbInsertSpy).toHaveBeenCalledWith('cars', mockCar);
      });
  });
});

describe('PUT /api/cars/:carId - Update a car', () => {
  it('Should not accept a call without any data', () => {
    return request(app)
      .put('/api/cars/0')
      .expect('Content-Type', /text/)
      .expect(
        400,
        'Bad request\n\n"value" must contain at least one of [plate, color, brand]'
      );
  });

  it('Should update the car in the database', async () => {
    const dbUpdateSpy = jest.spyOn(DB, 'update');
    dbUpdateSpy.mockReturnValue(undefined);

    const updateData = { plate: DUMMY_CAR.plate };

    return request(app)
      .put(`/api/cars/${DUMMY_CAR.id}`)
      .send(updateData)
      .expect(204)
      .then(() => {
        expect(dbUpdateSpy).toHaveBeenCalledTimes(1);
        expect(dbUpdateSpy).toHaveBeenCalledWith(
          'cars',
          updateData,
          DUMMY_CAR.id
        );
      });
  });
});

describe('DELETE /api/cars/:carId - Delete a car', () => {
  it('Should remove the car from the database', async () => {
    const dbRemoveSpy = jest.spyOn(DB, 'remove');
    dbRemoveSpy.mockReturnValue(undefined);

    return request(app)
      .delete(`/api/cars/${DUMMY_CAR.id}`)
      .expect(204)
      .then(() => {
        expect(dbRemoveSpy).toHaveBeenCalledTimes(1);
        expect(dbRemoveSpy).toHaveBeenCalledWith('cars', DUMMY_CAR.id);
      });
  });
});
