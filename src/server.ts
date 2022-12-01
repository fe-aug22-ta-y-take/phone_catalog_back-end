import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

import * as productsController from './controllers/products';

const router = express.Router();

import { router as productsRouter } from './routers/products';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/.netlify/functions/server', (req, res) => {
  res.send('<h1>Ta-y-take_team server</h1>'
  + '<h2>GET to /products - To get all phones in json</h2>'
  + '<h2>GET to /products?limit=16&offset=1 - To get first 16 phones</h2>');
})

app.use('/.netlify/functions/server/products', productsRouter);

export const handler = serverless(app);

// For development testing:
// app.get('/', (req, res) => {
//   res.send('<h1>Ta-y-take_team server</h1>'
//     + '<h2>GET to /products - To get all phones in json</h2>'
//     + '<h2>GET to /products?limit=16&offset=1 - To get first 16 phones</h2>');
// })

// app.use('/products', productsRouter);

// app.use('/', router);
// app.listen(5000, () => {
//   console.log('Server started');
// })
