import express from 'express';

import { tourRouter } from 'routes/tourRouter';

const app = express();

app.use(express.json());

app.use('/api/v1/tours', tourRouter);

export { app };
