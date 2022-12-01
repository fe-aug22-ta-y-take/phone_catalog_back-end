import fs from 'fs';
import { Request, Response } from 'express';
import path from 'path';


export const getAll = async (req: Request, res: Response) => {
  const products = fs.readFileSync(path.resolve(path.resolve(__dirname, 'projects', 'group_project_phone_catalog', 'phone_catalog_back-end', 'src', 'api', 'phones.json')));

  res.send(products.toString());
}
