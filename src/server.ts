import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { router as productsRouter } from './routers/products';
import { router as usersRouter } from './routers/users';
import { description } from './docs/documentation';

const app = express();

const BASE_NETLIFY_URL = '/.netlify/functions/server';

app.use(cors());
app.use(express.json());

app.get(BASE_NETLIFY_URL, (req, res) => {
  res.send(description);
});

app.use(`${BASE_NETLIFY_URL}/products`, productsRouter);
app.use(`${BASE_NETLIFY_URL}/users`, usersRouter);

export const handler = serverless(app);

// For development testing:

// app.get('/', (req, res) => {
//   res.send(description);
// });

// app.use('/products', productsRouter);
// app.use('/users', usersRouter);

// app.listen(5000, () => {
//   console.log('Server started');
// });
