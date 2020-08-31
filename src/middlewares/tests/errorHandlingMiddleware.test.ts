import request from 'supertest';

import app, { server } from '../../';

import * as DB from '../../repositories/memoryDB';

afterAll(() => {
  server.close();
});

it('Should fail gracefully on the ocurrence of any unexpected error', () => {
  const errorText = 'Whoopsie :(';
  jest.spyOn(DB, 'getAll').mockImplementation(() => {
    throw new Error(errorText);
  });

  return request(app)
    .get('/api/cars')
    .expect('Content-Type', /text/)
    .expect(500, errorText);
});

it('Should fail gracefully on the ocurrence of any unexpected error', () => {
  jest.spyOn(DB, 'getAll').mockImplementation(() => {
    throw {};
  });

  return request(app)
    .get('/api/cars')
    .expect('Content-Type', /text/)
    .expect(500, 'Something went wrong!');
});
