
import { Request, Response } from 'express';

import * as phonesService  from '../services/phones';
import { Order } from '../types/Order';
import { Group } from '../types/Group';
import { Phone } from 'src/types/Phone';
import { PhonesResults } from 'src/types/PhonesResults';
import { PhoneResults } from 'src/types/PhoneResults';
import { PhoneDetails } from 'src/types/PhoneDetails';

export const getAllWithQueryFilters = async (req: Request, res: Response) => {
  try {
    let products: Phone[] | null = phonesService.getAll();

    if (!products) {
      res.sendStatus(500);

      return;
    }

    const { limit, offset, order, dir, group } = req.query;

    if (group) {
      products = products.filter(product => {
        switch (group) {
          case Group.New:
            return product.year === 2019;
          case Group.Discount:
            return product.price !== product.fullPrice;
          default:
            return false;
        }
      });
    }

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

    const phonesResults: PhonesResults = {
      edges: products,
      count: products.length,
    }

    if (!limit && !offset) {
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

export const getOneDetails = async (req: Request, res: Response) => {
  try {
    const { phoneId } = req.params;
    const phone: PhoneDetails = phonesService.getById(phoneId);

    if (!phone) {
      res.sendStatus(404);

      return;
    }

    const phones: Phone[] | null = phonesService.getAll();

    if (!phones) {
      res.sendStatus(500);

      return;
    }

    const phoneFromDb = phones.find(item => item.phoneId === phoneId);

    if (!phoneFromDb) {
      res.sendStatus(500);

      return;
    }

    const phoneResults: PhoneResults = {
      phone,
      id: phoneFromDb.id,
      similar: phones,
    };

    const similarPhones = phones.filter(item => item.ram === phone.ram && item.capacity === phone.capacity && item.phoneId !== phone.id);

    if(similarPhones.length) {
      phoneResults.similar = similarPhones;
    }

    res.send(JSON.stringify(phoneResults));
  } catch (error) {
    res.sendStatus(500);
  }
}

export const getByIds = async (req: Request, res: Response) => {
  try {
    const products: Phone[] | null = phonesService.getAll();

    if (!products) {
      res.sendStatus(500);

      return;
    }

    const { ids } = req.query;

    if (!ids?.length) {
      res.sendStatus(400);

      return;
    }

    const parsedIds = (ids as string).split(',');

    const filteredProducts = products.filter(product => (
      parsedIds.includes(String(product.id))
    ));

    res.send(JSON.stringify(filteredProducts));
  } catch {
    res.sendStatus(500);
  }
}
