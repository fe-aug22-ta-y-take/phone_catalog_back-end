import fs from 'fs';
import { Request, Response } from 'express';
import path from 'path';

export const getImage = (req: Request, res: Response) => {
  try {
    const imgLink = req.originalUrl.split('server')[1].slice(1);

    res.setHeader('Content-Type', 'image/jpeg');

    const image = fs.createReadStream(path.resolve(__dirname, imgLink));

    image.pipe(res);

  } catch (error) {
    res.sendStatus(400);
  }
}
