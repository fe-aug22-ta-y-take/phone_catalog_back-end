import express from 'express';

import * as phonesController from '../controllers/phones';

export const router = express.Router();

router.get('/favorites', phonesController.getByIds);
router.get('/cart', phonesController.getByIds);
