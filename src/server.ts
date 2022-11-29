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

app.use('/.netlify/functions/server', router);

export const handler = serverless(app);