import express from 'express';

import {
  getAllTours,
  createTour,
  getSingleTour,
  updateTourByPut,
  updateTourByPatch,
  deleteTour,
  checkId,
  validateCreateTourRequest,
} from 'controllers/tourController';

const router = express.Router();

// 1
// there is one special kind of middleware which is provided by the router object cald parm middleware this middleware will
// except one dynamic param name and this middleware will call when this param will be passed in any routs
// hear this param will execute when we will get id in put, patch, delete request in tours resource and on there
// endpoints as well which we will create in future which will have id as dynamic param in it.
// this param will have req, res, next as usual middleware but it will also have one extra param which will be dynamic value
// for which we are registering this middleware hear it will be dynamic id.

// this param middleware is useful when we want to execute one check that id is available in db or not and if not
// then return 404 or else continue in middleware stack so we don't have to check in each and every routs for
// this check repetitively

// now you will argue that we can also create separate function to check this and can call that function in all routs
// where we want to check this condition but for that we also have to call that function in all routes and according
// to express rules all checks of this kind should do by middleware stack only. so in controllers we will only
// have logic for that those controllers are created in get delete etc controllers we just get or delete resource
// as the controller name suggest we try to avoid that extra checks in controllers so every controller is responsible
// for single task. now lets create one controller to check if id is exist and then use it in this id param
router.param('id', (req, res, next, val) => {
  console.log(`hit tour id param middleware : ${val}`);
  next();
});

// 3
// we can also chain as many middleware as we want by chaining the middleware we can execute them one by one for checking
// different conditions and our req will travel from all that middleware stacks chain in sequence and if there is something
// we can break the chain by returning response from any middleware

// in express we try to create isolated functions so each and every function just do one task most of the time
// like updateTour will only update tour it will not check if id is valid or data we need is validated it just update
// tours as name suggest. we should create separate functions for check id and validation

// so we can create those kind of middleware in our app and can chain them for one request so we will also be able to
// use those middleware in other routes as well
// for example we want to check token, validate request then create tour so we can create 3 middleware for this and this
// token and validation middleware can be re usable in other routes

// to chain multiple middleware in sequence we can just provide them as params in route function and they will execute
// base on they are passed in params

// lets create simple validation middleware which we will use before creating the tour

router.param('id', checkId);

router.get('/', getAllTours);

router.post('/', validateCreateTourRequest, createTour);

router.get('/:id', getSingleTour);

router.put('/:id', updateTourByPut);

router.patch('/:id', updateTourByPatch);

router.delete('/:id', deleteTour);

export { router as tourRouter };
