import fs from 'fs';
import { Request, Response } from 'express';
import path from 'path';

export const getAll = async (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, 'api', 'phones.json')
    );

    const { limit, offset } = req.query;

    if (!limit && !offset) {
      res.send(data.toString());

      return;
    }

    const numbLimit = Number(limit);
    const numbOffset = Number(offset);

    const products = JSON.parse(data.toString());

    const startIndex = numbLimit * (numbOffset - 1);
    const endIndex = numbLimit * numbOffset;

    res.send(JSON.stringify(products.slice(startIndex, endIndex)));

  } catch (error) {
    res.sendStatus(500);
  }
}

export const getLength = async (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, 'api', 'phones.json')
    );

    const products = JSON.parse(data.toString());

    res.send(products.length);

  } catch (error) {
    res.sendStatus(500);
  }
}
