import fs from 'fs';
import path from 'path';

export const getAll = () => {
  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, 'api', 'phones.json')
    );

    return JSON.parse(data.toString());
  } catch (error) {
    return null;
  }
}

export const getById = (phoneId: string) => {
  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, 'api', 'phones', `${phoneId}.json`)
    );

    return JSON.parse(data.toString());
  } catch (error) {
    return null;
  }
}
