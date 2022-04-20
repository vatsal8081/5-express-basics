import fs from 'fs';
// for node 12 +
// import fsAsync from 'fs/promises';

// for node 12
const fsAsync = fs.promises;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`));

// 2
// before creating that params check middleware lets understand difference between res.json(), next() and return

// - res.json() = as you know this many other response methods as used to send response to clients but the key thing to
// note hear is when we do this the response is sent to client that mins we can't process the request further and we can'r
// modify or work on the request but if we will have something else in code in controller after that then it will still run
// so that mins the response will be sent but it not stop code execution further so if we have other code it will still run
// but if we try to manipulation the request after res.json then we will get err so code execution is allowed but
// request manipulation and resend response is not allowed after sending response once because response is sent already

// - return = hear return will work just like it did in simple function that mins any of code after that will not run
// so if we have even clg after return in controller it will not work
// so if we do return return res.json() then it will send response ad then stop any execution after that

// - next() = next is as you know it's useful for just passing request further from middleware so it can continue
// in middleware stack that mins any code in middleware will not execute after next()

// now lets use and understand this 3 things in checkId middleware

const checkId = (req, res, next, val) => {
  const id = Number(req.params.id);

  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    // hear we want to send the response 404 so we are using the res.json but also notice that after that
    // because resource is not found so we should not continue in this middleware and also we have to break
    // middleware stack so request not go further so we also use return with res.json so it stop execution
    // of current request and also break middleware stack
    return res.status(404).json({
      status: 'fail',
      message: `tour with ${id} not found.`,
    });
  }

  // hear if we id find the resource and so we will not go in if(!tour) check so request should continue further in
  // middleware stack so we did next hear so request can continue further.
  next();
};

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
  getAllTours,
  getSingleTour,
  createTour,
  updateTourByPut,
  updateTourByPatch,
  deleteTour,
  checkId,
};
