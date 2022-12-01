import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { router as productsRouter } from './routers/products';
import { router as imagesRouter } from './routers/images';
import path from 'path';

const app = express();

const BASE_NETLIFY_URL = '/.netlify/functions/server';

app.use(cors());
app.use(express.json());

app.get(BASE_NETLIFY_URL, (req, res) => {
  res.send('<h1>Ta-y-take_team server</h1>'
  + '<h2>GET to /products - To get all phones in json</h2>'
  + '<h2>GET to /products?limit=16&offset=1 - To get first 16 phones</h2>'
  + '<h2>GET to /static/ + image-value from phone-object in phones.json - To get appropriate image</h2>');
});

app.use(`${BASE_NETLIFY_URL}/api`, imagesRouter);

app.use(`${BASE_NETLIFY_URL}/products`, productsRouter);

export const handler = serverless(app);

// For development testing:

// app.get('/', (req, res) => {
//   res.send('<h1>Ta-y-take_team server</h1>'
//     + '<h2>GET to /products - To get all phones in json</h2>'
//     + '<h2>GET to /products?limit=16&offset=1 - To get first 16 phones</h2>');
// });

// app.use('/api', imagesRouter);

// app.use('/products', productsRouter);

// app.listen(5000, () => {
//   console.log('Server started');
// });
