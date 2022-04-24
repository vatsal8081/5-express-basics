import dotenv from 'dotenv';
import path from 'path';

// hear we use path.resolve to get actual path of env file from the our current place
// the path.resolve is from path module from node core and this is the ideal way to configure the dotenv
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// another thing to keep in mind is that we should always set our environments variables before we do anything in app
// so as our process starts we can set environments so that other processes like express, db and other can use
// our defined variables so it should be just first thing as soon as we run the process then any other thing

// just for example if we import the app before importing and configuring the dotenv the PORT will be undefine in
// the app.js so it should be always first

// import { app } from './app';
const { app } = require('./app');

// now as per our current implementation we have to use require instead or es6 import for app because hear the problem
// is as we discuss above we have to load environment variable before we do anything in app
// but when we do es6 import the js will always load import statements first weather we put it after detenv.config
// so that mins when we do es6 import of app our app file will be run before detenv.config so we will get the env
// variable undefined in it so we have to use commonJS import hear so we can import app after detenv.config

// again all this problems will go away when we will learn to make and use the proper structure for our node app.

const port = process.env.PORT || 3000;
app.listen(port, '127.0.0.1', () =>
  console.log(`listrning on port: ${port}...`)
);
