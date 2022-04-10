const express = require('express');

// first compleare 1,2 etc route thing thene read this controller realted thing
// we will import all this controllers like this and assign it to our endpoints.
const {
  getaAllTours,
  createTour,
  getSingelTour,
  updateTourByPut,
  updateTourByPatch,
  deleteTour,
} = require('../controllers/tourController');

// 1
// we can create a instance of router by express.Rounter() this will return a new instance of router which wi just a middlewere wehic we can apply to our app
const router = express.Router();

// 2
// now insted of app we will use this router instance to treate apis for this specific entites
// other thing which you can see hear is we just define extra route path in all endpoints because when we will register this route instance middlewere we will register it to the tours related routes only so it cannot run in all routes which will be bad practic to do
// so when we will register the route instance we will specify our commen endpoint there so this route instance middlewere can run only to the tours related routes and hear we just specify extra path
// ex we will register this tour route middlewere for path /api/v1/tours so in this endpoints we just specify / for notthing /:id for /api/v1/tours/:id like that

router.get('/', getaAllTours);

router.post('/', createTour);

router.get('/:id', getSingelTour);

router.put('/:id', updateTourByPut);

router.patch('/:id', updateTourByPatch);

router.delete('/:id', deleteTour);

// 3
//   then we will export this rouetr instance so that we can register it for tours related routes in app.

// check more in app.js at 4
module.exports = router;
