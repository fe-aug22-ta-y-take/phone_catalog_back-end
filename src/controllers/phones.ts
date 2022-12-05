
import { Request, Response } from 'express';

import { Order } from '../types/Order';
import { Phone } from 'src/types/Phone';
import { PhonesResults } from 'src/types/PhonesResults';
import * as phonesService  from '../services/phones';

export const getAll = async (req: Request, res: Response) => {
  try {
    const products: Phone[] | null = phonesService.getAll();

    if (products) {
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

      return;
    }

    throw new Error('Some error');
  } catch (error) {
    res.sendStatus(500);
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const { phoneId } = req.params;

    const phone = phonesService.getById(phoneId);

    if (phone) {
      res.send(JSON.stringify(phone));

      return;
    }

    throw new Error('No such phone');
  } catch (error: any) {
    if (error.message === 'No such phone') {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(500);
  }
}
