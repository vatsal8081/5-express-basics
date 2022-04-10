// 1
// it is a good practic to always seprate the express related thing and server related things in seprate files so in app.js we will have all the things whic is related to our express app like express configration, global and route mounted middlewers etc. and all the things which is related to server in server js like starting server and listerning on some port, DB connections, error handlings and env etc.

// we we will create a seprate file cald server.js and define all server related things in it inster of app and in app.js there will be app related things.

// and because we are starting and listerning to some port from server.js our entry point will be server.js insted of app.js and we have to change our dev script in package.json from app.js to server.js

const { app } = require('./app');

const port = 3000;
app.listen(port, '127.0.0.1', () =>
  console.log(`listrning on port: ${port}...`)
);
