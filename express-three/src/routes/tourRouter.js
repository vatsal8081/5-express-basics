import express from 'express';

import {
  getaAllTours,
  createTour,
  getSingelTour,
  updateTourByPut,
  updateTourByPatch,
  deleteTour,
} from 'controllers/tourController';

const router = express.Router();

router.get('/', getaAllTours);

router.post('/', createTour);

router.get('/:id', getSingelTour);

router.put('/:id', updateTourByPut);

router.patch('/:id', updateTourByPatch);

router.delete('/:id', deleteTour);

export { router as tourRouter };
