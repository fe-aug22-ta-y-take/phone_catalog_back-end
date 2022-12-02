import fs from 'fs';
import { Request, Response } from 'express';
import path from 'path';

export const getAll = async (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, 'api', 'phones.json')
    );

    const products = JSON.parse(data.toString());

    const phonesResults = {
      edges: [],
      count: products.length,
    }

    const { limit, offset } = req.query;

    if (!limit && !offset) {
      phonesResults.edges = products;

      res.send(JSON.stringify(phonesResults));

      return;
    }

    const numbLimit = Number(limit);
    const numbOffset = Number(offset);

    const startIndex = numbLimit * (numbOffset - 1);
    const endIndex = numbLimit * numbOffset;

    phonesResults.edges = products.slice(startIndex, endIndex);

    res.send(JSON.stringify(phonesResults));

  } catch (error) {
    res.sendStatus(500);
  }
}
