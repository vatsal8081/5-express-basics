import express from 'express';
import morgan from 'morgan';

import { tourRouter } from 'routes/tourRouter';

const app = express();

// we can check the NODE_ENV is development then we can enable many debugging features like morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// 4
// yes we use our backend for creating routes and also response from it but in backend we can also put static files
// and then we can serve those static files so users can access those with url.
// static files can be useful in serving some images, audios and other contents

// so for serving those static files we can just create public folder in our app a folder name can be anything but we
// mostly cald it public because it will be publicly accessible to all.
// but by just creating this folder we can't use serve them to serve them we have to use a middelware from the express
// cald static and we can provide the folder path where we store static contents

// now when we request any route endpoint from browser express go to find that route in the defined endpoints and if
// it not find then it go in public folder to find it so just make sure route endpoint and public endpoint should not be
// same. and we don't need to give folder name to access the static files like the abc.png is store in the public/images/abc.png
// then path to access will be images/abc.png (folder name is not needed where we store static content)
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);

export { app };
