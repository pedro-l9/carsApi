import express, { ErrorRequestHandler } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger.json';

import { carsRouter, driversRouter, usagesRouter } from './routers';
import errorHandlingMiddleware from './middlewares/errorHandlingMiddleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cars', carsRouter);
app.use('/api/drivers', driversRouter);
app.use('/api/usages', usagesRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandlingMiddleware as ErrorRequestHandler);

export const server = app.listen(3000, () =>
  console.log('Server running on port 3000')
);

export default app;
