import express from 'express';

import * as phonesController from '../controllers/phones';

export const router = express.Router();

router.get('/phones', phonesController.getAll);

