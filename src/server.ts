import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

const router = express.Router();

const app = express();

app.use(cors());

router.get('/', (req, res) => {
  res.json({
    'Hello': 'from Ta-y-take_team',
  })
})

// For development testing:
// app.use('/', router);
// app.listen(5000, () => {
//   console.log('Server started');
// })

// For production:
app.use('/.netlify/functions/server', router);
export const handler = serverless(app);
