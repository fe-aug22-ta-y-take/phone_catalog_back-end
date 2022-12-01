import fs from 'fs';
import { Request, Response } from 'express';
import path from 'path';

export const getImage = (req: Request, res: Response) => {
  try {
    const imgLink = req.originalUrl;

    res.setHeader('Content-Type', 'image/jpeg');

    const image = fs.createReadStream(path.join(__dirname, `${imgLink.slice(0)}`));

    image.on('error', () => {
      res.sendStatus(500);

      return;
    });

    image.pipe(res);

  } catch (error) {
    res.sendStatus(400);
  }
}
