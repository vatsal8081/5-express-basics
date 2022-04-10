const morgan = require('morgan');

const express = require('express');

const tourRouter = require('./routes/tourRouter');

const app = express();

app.use(express.json());

app.use(morgan('dev'));




// 4
// after inporting the exported router middlewere object we can register it just to run for tours related routes only to handle them like this. we can specify the common url hear in use mathod and then provide router middlewere instance so when request comes to /api/v1/tours the express run tourRouter middlewere and then base on extra endpoint and request method the express run one of the handler of tourRouter instance
// like this we create seprate instance of router kind of mini app for each and every entity of app so we can better seprate feactures of our app
app.use('/api/v1/tours', tourRouter);

module.exports = { app };