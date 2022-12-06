
import { Request, Response } from 'express';

import * as phonesService  from '../services/phones';
import { Order } from '../types/Order';
import { Phone } from 'src/types/Phone';
import { PhonesResults } from 'src/types/PhonesResults';
import { PhoneResults } from 'src/types/PhoneResults';
import { PhoneDetails } from 'src/types/PhoneDetails';

export const getAllWithQueryFilters = async (req: Request, res: Response) => {
  try {
    const products: Phone[] | null = phonesService.getAll();

    if (!products) {
      res.sendStatus(500);

      return;
    }

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

    const phoneResults: PhoneResults = {
      phone,
      similar: phones,
    }

    const similarPhones = phones.filter(item => item.ram === phone.ram && item.capacity === phone.capacity);

    if(similarPhones.length) {
      phoneResults.similar = similarPhones;
    }

    res.send(JSON.stringify(phoneResults));
  } catch (error) {
    res.sendStatus(500);
  }
}

export const getFiltered = async (req: Request, res: Response) => {
  try {
    const url = req.url.split('/');
    const filterBy = url[url.length - 1];

    const products: Phone[] | null = phonesService.getAll();

    if (!products) {
      res.sendStatus(500);

      return;
    }

    const today = new Date();
    const year = today.getFullYear();

    const filteredProducts = products.filter(product => {
      switch (filterBy) {
        case 'phones-new':
          return product.year === year;
        case 'phones-discount':
          return product.price !== product.fullPrice;
        default:
          return true;
      }
    });

    res.send(JSON.stringify(filteredProducts));
  } catch {
    res.sendStatus(500);
  }
}
