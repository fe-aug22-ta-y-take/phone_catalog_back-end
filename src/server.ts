import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

import * as productsController from './controllers/products';

const router = express.Router();

const app = express();

app.use(cors());
app.use(express.json());

router.get('/', (req, res) => {
  res.json({
    'Hello': 'from Ta-y-take_team',
  })
})

router.get('/products', productsController.getAll);

// For development testing:
// app.use('/', router);
// app.listen(5000, () => {
//   console.log('Server started');
// })

// For production:
app.use('/.netlify/functions/server', router);
export const handler = serverless(app);
