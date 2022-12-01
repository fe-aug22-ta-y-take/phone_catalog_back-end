import express from 'express';

import * as imagesController from '../controllers/images';

export const router = express.Router();

router.use('/', imagesController.getImage);
