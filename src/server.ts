import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { router as productsRouter } from './routers/products';

const app = express();

const BASE_NETLIFY_URL = '/.netlify/functions/server';

const description = `<h1>Ta-y-take_team server</h1>
<h2>GET to /products/phones - get interface PhonesResults
{ edges: Phone[], count: number } in json</h2>
<h2>GET to /products/phones?limit=16&offset=1&order=price&dir=asc - get PhonesResults
with first 16 phones sorted by price in ascending order
(order: price | new; dir: asc | desc)</h2>
<h2>GET to /products/phones/phoneId - get interface PhoneResults
{ phone: PhoneDetails, similar: Phone[] } in json</h2>
<h2>GET to /products/phones/new - get Phone[] with current year</h2>
<h2>GET to /products/phones/new - get Phone[] with price !== fullPrice</h2>
<p></p>
<h2>GET to https://effulgent-elf-0da1cb.netlify.app/ + image value
from phone-object in phones.json - get appropriate image</h2>`;

app.use(cors());
app.use(express.json());

app.get(BASE_NETLIFY_URL, (req, res) => {
  res.send(description);
});

app.use(`${BASE_NETLIFY_URL}/products`, productsRouter);

export const handler = serverless(app);

// For development testing:

// app.get('/', (req, res) => {
//   res.send(description);
// });

// app.use('/products', productsRouter);

// app.listen(5000, () => {
//   console.log('Server started');
// });
