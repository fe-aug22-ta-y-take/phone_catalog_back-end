import fs from 'fs';
import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response) => {
  const products = fs.readFileSync('public/api/phones.json');
  res.send(products.toString());
}