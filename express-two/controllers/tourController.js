// 1
// hear in tourController.js we can write all the logic which is neede ro give some meaningful response to user so all logic will be hear
const fs = require('fs');
const fsAsync = fs.promises;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`));

// 2
// we will create seprate functions for each route endpoint and we will export it from hear and the inport it to routes folder so we can use then as route handler there

// we create seprate controllers file for seprate entites in project

// for more info check imports of tourRoutes.js
const getAllTours = (req, res) => {
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

const getSingleTour = (req, res) => {
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

module.exports = {
  getAllTours,
  getSingleTour,
  createTour,
  updateTourByPut,
  updateTourByPatch,
  deleteTour,
};
