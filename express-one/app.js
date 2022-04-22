const fs = require('fs');
const fsAsync = fs.promises;
const morgan = require('morgan');

// 1
// first of all we have to import express to use it. convension is that we export it in express variable
const express = require('express');

// 2
// now we can create new instance of express app with the exported express default function in express variable and its convension that we store that app instance in app variable.

const app = express();

// you will learn about this in 7
app.use(express.json());

// 13
// there are tons and tons of third party middlewers avalable as librarys in github and npm and we can use those third party middlewers in our express app to simplify the development
// now one thing to just know is if you go to express site and under resourse tab you will see middlewere page in there there are many middlewers listed which are built in just like body parser middlewere and we can use them directly and there are also many third party middleweres listed which we can use.
// before express 14.16 the body parser the CORS etc middlewers was not the part of officeal express package so we was not able to use them just we did hear in body parser by using it from express package for that we have to install that seprate middlewere form npm and then we was able to use them but after express 14.16 those important middlewers was added in to express library so we can directly use them no need to install them sepratly from npm

// let use one third part middlewere which is not a part of express middlewere cald morgan which well help to log request in console to show how we use third party middleweres
// morgan is not dev dependency so we have to install it in depandency section and then we can register it as we did register other middlewere in app so first we will do yarn add morgan then require morgan and then app.use morgan with passing format in which we want the log and then you will see logs in console on every requests.
app.use(morgan('dev'));

// 12
// as you can see hear that we use body parser middlewere from express by writing app.use(express.json()) where use is a method in app instance to register a middlewere in express app and express.json() will return a callback which we can pass as param to use function to register a body parser middlewere

// now lets create our own middlewere

app.use((req, res, next) => {
  console.log('hiiii from middlewere...');
  next();
});

// this is the simplest gelbal level middlewere which will be execute in each and every request hear in callback we will get req, res, and next function and everytime its miportant to call next at the end so request can go further if we don't do next then the request will stay stucked in this middlewere and we will not get response.

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(`req time is ${req.requestTime}`);
  next();
});

// as you can see we are just menupulating the req object in middlewere and there are many other things we can do in middlewere
// and if you check the sequence of the console it's same as we define in middlewere sequence
// so that mins every middlewere will execute in sequence they are register in app.use of in other words in sequence they are written in code.
// all this are global middlewere so they will execute in every request
// if we move any of this middlewere after routes then it will not execute because as you know when we reatch to route handler then in that our response will be so after that middlewere will not execute
// so in express we register all our global middleweres before the routes in sequence we want to execute them.

// 3
// after that we have to listern on some port to use endpoints just we do in http module in node so we can use app instance to listern on any port.
// just like listern in http we can provide port host string and callback but hear host string is optional it's by default loaclhost so you can ommit it.
const port = 3000;
app.listen(port, '127.0.0.1', () =>
  console.log(`listrning on port: ${port}...`)
);

// 4
// the app object has various methods one is get which we can use for creating the get endpoint the method takes various params and most basic are endpoint pats and callback to execute when endpoint get hit.
// it probides req and res objects in callback which has various methods and data which we can use for various use
app.get('/', (req, res) => {
  res.send('Hello World');
});

// we can also chain those methods to get end result
app.get('/404', (req, res) => {
  res.status(404).send('not found');
});

// as you know in normal node for sending json response we have to send content type by our hand but hear the json method do it and also send json response
app.get('/data', (req, res) => {
  res.json({ name: 'vatsal patel', contact: 9104243444 });
});

// 6
// lets make simple get api for tours
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`));
app.get('/api/v1/tours', (req, res) => {
  res.json({
    status: 'success',
    data: { tours },
  });
});

// callback which we pass for any route is cald route handler

// hear we can read the data which will not chnage every time in boot of app only insted of reading on every request because we have to do asynchronous code in code which will run in event loop which is not a case hear so synchronous code will be ok
// it's good practic to define api prefix on every api so that other can know this will return data in json and ment to work with multiple diffrent clients because in single project you can have 2 kinds on endpoints one will work with backend templating and other are made as api so templating one will not have api prefix and api one will have. also we should specify a api version so if we want we can create same route for other versions as well so we can provide diffrent code in other version so user with old version can have old code and not brecking chnage. we will explore this api and version thing in more depth in future and will find some good way to handel this but for now it's ok this way

// we are enveloping the response in some basic fix format but we will also explore how to do this in more good way in future.

// 7
// let make simple post api for tours
app.post('/api/v1/tours', async (req, res) => {
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
});

// in express you will not get the request body just like that for getting it you have to use middlewere which can give the request data to use in request object
// we will learn about middlewere in more depth in future but for now keep in mand that to get data in req object we have to use app.use(express.json()) which is in top of file above after that we will get data in req.body
// also explore the req and res objects so you can get idea what kind of data nad methods it provides.

// then for now we create new entry by combinig data and push it to tours object and then we have to write it to file so for that we use the promises virsion of the fs module because as you know we cannot block event loop in callbacks then we send response with proper status code.

// one main thing to keep in mind that when you create new entry and use get api you will get that new data but as rule the code in root level will run one time only but why then we are getting the new entry without restart. because when we add new entry to file nodemone restart server and so the root level code execute again so we have new data otherwise the root level will run once only so we will not have data by rule until we restart server

// also always try to wrap any promise or db call to try catch so if something went wrong we can provide meningfull response.

// 8
// lets create get single tour api with dynamic params

app.get('/api/v1/tours/:id', (req, res) => {
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
});

// as you can see hear many times we also have to define dynamic route params in api endpoint so we can do this by putting : in front of param name so express will know that this is dynamic param and the value of it can be anything dynamic
// now to get this param value we can get it in req.params object
// we can define as many dynamic params as we want in single endpoint
// now if we define any dynamic params that mins we have to pass it in endpoint otherwise the endpoint will not valid ex we cannot do api/v1/tours/1 when we have endpoint api/v1/tours/:id/:name hear name is also require but if we want to create such endpoints where any param is optional we can just put ? at the end of param name so if we pass it will show in params otherwise it will be undefine in params
// like this /api/v1/tours/:id/:tmp?

// 9
// now lets create endpoints for update resourse and as you know we have 2 request types for that put and patch in put we have to send whole object in body which we want to update whather any fields are updated or stay same. and in patch we only have to send the fields which are updated not whole object. so you can use both of them base on convinence.

app.put('/api/v1/tours/:id', (req, res) => {
  console.log('tour put body =', req.body);

  res.json({
    status: 'success',
    data: '<updated tour..>',
  });
});

app.patch('/api/v1/tours/:id', (req, res) => {
  console.log('tour patch body =', req.body);

  res.json({
    status: 'success',
    data: '<updated tour..>',
  });
});

// 10
// lets crerate delete tours endpoint

app.delete('/api/v1/rours/:id', (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// most of the time when we create delete api we just send status code as 204 that mins no content and we send data as null because respouse is deleted and to show that there is no any data like that.

// hear we just created put and patch and delete endpoints but we did't add any logic to it because that will be simple js code of reading file getting data and updating in file and in real world we do this to DB so no need to write any core for that now this is just to show how put patch and delete requests work in node

// 11
// in express we have route() function in app object in this object we can pass any route and then we can chain multiple type of requests to it so for same kind routes where there is just a request type is changing we can handle it in one place

// ex app.route('/api/v1/toues').get(getAllTours).post('createTour')
// like this hear we are specifing route in route function and can chain all kind of request types and pass callpacks of those hear which will execute on those request types.

// also in course he did refactoring the code he assign this callbacks of endpoints to functions and pass those to as reference so code looks cleane but we are not doing it because we will use more cleane way in future so callbacks directly is fine for now.
// sec 6 vid no 11
