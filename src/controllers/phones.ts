import fs from 'fs';
import { Request, Response } from 'express';
import path from 'path';
import { Order } from '../types/Order';
import { Phone } from 'src/types/Phone';
import { PhonesResults } from 'src/types/PhonesResults';

export const getAll = async (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, 'api', 'phones.json')
    );

    const products: Phone[] = JSON.parse(data.toString());

    const phonesResults: PhonesResults = {
      edges: [],
      count: products.length,
    }

    const { limit, offset, order, dir } = req.query;

    if (order && dir) {
      products.sort((prev: Phone, next: Phone) => {
        switch (order) {
          case Order.New:
            return prev.year - next.year;

          case Order.Price:
            return prev.price - next.price;

          default:
            return 0;
        }
      })

      if (dir === 'desc') {
        products.reverse();
      }
    }

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
