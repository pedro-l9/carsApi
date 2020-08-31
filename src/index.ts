import express, { ErrorRequestHandler } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger.json';

import router from './router';
import errorHandlingMiddleware from './middlewares/errorHandlingMiddleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandlingMiddleware as ErrorRequestHandler);

app.listen(3000, () => console.log('Server running on port 3000'));
