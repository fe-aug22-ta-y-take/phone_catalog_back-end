import fs from 'fs';
import { Request, Response } from 'express';
import path from 'path';


export const getAll = async (req: Request, res: Response) => {
  const products = fs.readFileSync(path.resolve(__dirname, '..', 'api', 'phones.json'));

  res.send(products.toString());
}
