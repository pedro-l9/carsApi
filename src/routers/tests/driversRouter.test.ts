import request from 'supertest';

import app, { server } from '../../';

import * as DB from '../../repositories/memoryDB';
import { DAO, Driver } from '../../types';

const DUMMY_DRIVER: DAO<Driver> = Object.freeze({
  id: 0,
  name: 'Pedro',
});

afterAll(() => {
  server.close();
});

describe('GET /api/drivers - Get all drivers', () => {
  it('Should return all the drivers in the database', () => {
    jest.spyOn(DB, 'getAll').mockReturnValue([DUMMY_DRIVER]);

    return request(app)
      .get('/api/drivers')
      .expect('Content-Type', /json/)
      .expect(200, [DUMMY_DRIVER]);
  });
});

describe('GET /api/drivers/:driverId - Get a specific driver', () => {
  it('Should return error 404 with the text "No driver with id "${driverId}"" when there is no driver with the passed Id', () => {
    jest.spyOn(DB, 'get').mockReturnValue(undefined);

    return request(app)
      .get(`/api/drivers/${DUMMY_DRIVER.id}`)
      .expect('Content-Type', /text/)
      .expect(404, `No driver with id "${DUMMY_DRIVER.id}"`);
  });

  it('Should return a driver given its Id', () => {
    jest.spyOn(DB, 'get').mockReturnValue(DUMMY_DRIVER);

    return request(app)
      .get(`/api/drivers/${DUMMY_DRIVER.id}`)
      .expect('Content-Type', /json/)
      .expect(200, DUMMY_DRIVER);
  });
});

describe('POST /api/drivers - Create a driver', () => {
  it('Should reject calls with missing properties with a Bad request', () => {
    return request(app)
      .post('/api/drivers')
      .send({})
      .expect('Content-Type', /text/)
      .expect(400, `Bad request\n\n"name" is required`);
  });

  it('Should add a driver to the database', async () => {
    const dbInsertSpy = jest.spyOn(DB, 'insert');
    dbInsertSpy.mockReturnValue(DUMMY_DRIVER);
    const { id: _, ...mockdriver } = DUMMY_DRIVER;

    return request(app)
      .post('/api/drivers')
      .send(mockdriver)
      .expect('Content-Type', /json/)
      .expect(201, DUMMY_DRIVER)
      .then(() => {
        expect(dbInsertSpy).toHaveBeenCalledTimes(1);
        expect(dbInsertSpy).toHaveBeenCalledWith('drivers', mockdriver);
      });
  });
});

describe('PUT /api/drivers/:driverId - Update a driver', () => {
  it('Should not accept a call without any data', () => {
    return request(app)
      .put('/api/drivers/0')
      .expect('Content-Type', /text/)
      .expect(
        400,
        'Bad request\n\n"value" must contain at least one of [name]'
      );
  });

  it('Should update the driver in the database', async () => {
    const dbUpdateSpy = jest.spyOn(DB, 'update');
    dbUpdateSpy.mockReturnValue(undefined);

    const { id: driverId, ...updateData } = DUMMY_DRIVER;

    return request(app)
      .put(`/api/drivers/${driverId}`)
      .send(updateData)
      .expect(204)
      .then(() => {
        expect(dbUpdateSpy).toHaveBeenCalledTimes(1);
        expect(dbUpdateSpy).toHaveBeenCalledWith(
          'drivers',
          updateData,
          driverId
        );
      });
  });
});

describe('DELETE /api/drivers/:driverId - Delete a driver', () => {
  it('Should remove the driver from the database', async () => {
    const dbRemoveSpy = jest.spyOn(DB, 'remove');
    dbRemoveSpy.mockReturnValue(undefined);

    return request(app)
      .delete(`/api/drivers/${DUMMY_DRIVER.id}`)
      .expect(204)
      .then(() => {
        expect(dbRemoveSpy).toHaveBeenCalledTimes(1);
        expect(dbRemoveSpy).toHaveBeenCalledWith('drivers', DUMMY_DRIVER.id);
      });
  });
});
