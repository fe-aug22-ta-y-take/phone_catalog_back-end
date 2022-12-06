import express from 'express';

import * as phonesController from '../controllers/phones';

export const router = express.Router();

router.get('/phones', phonesController.getAllWithQueryFilters);
router.get('/phones/:phoneId', phonesController.getOneDetails);
router.get('/phones/new', phonesController.getFiltered);
router.get('/phones/discount', phonesController.getFiltered);
