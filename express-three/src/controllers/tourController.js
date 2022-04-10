import fs from 'fs';
import fsAsync from 'fs/promises';

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`));

const getaAllTours = (req, res) => {
  res.json({
    status: 'success',
    data: { tours },
  });
};

const createTour = async (req, res) => {
  console.log('tours post data...', req.body);

  const newTour = {
    id: tours[tours.length - 1].id + 1,
    ...req.body,
  };

  tours.push(newTour);

  await fsAsync.writeFile(
    `${__dirname}/data/tours.json`,
    JSON.stringify(tours)
  );

  res.status(201).json({
    status: 'success',
    data: newTour,
  });
};

const getSingelTour = (req, res) => {
  const id = Number(req.params.id);

  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: `tour with ${id} not found.`,
    });
  }

  res.json({
    status: 'success',
    data: { tour },
  });
};

const updateTourByPut = (req, res) => {
  console.log('tour put body =', req.body);

  res.json({
    status: 'success',
    data: '<updated tour..>',
  });
};

const updateTourByPatch = (req, res) => {
  console.log('tour patch body =', req.body);

  res.json({
    status: 'success',
    data: '<updated tour..>',
  });
};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

export {
  getaAllTours,
  getSingelTour,
  createTour,
  updateTourByPut,
  updateTourByPatch,
  deleteTour,
};
