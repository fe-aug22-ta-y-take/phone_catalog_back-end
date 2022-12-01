import fs from 'fs';
import { Request, Response } from 'express';
import path from 'path';

export const getImage = async (req: Request, res: Response) => {
  try {
    const imgLink = req.originalUrl.split('server')[1].slice(1);

    fs.readFile(path.resolve(__dirname, imgLink), (err, content) => {
      res.setHeader('Content-Type', 'image/jpeg');
      res.end(content);
    });
  } catch (error) {
    res.sendStatus(500);
  }
}
