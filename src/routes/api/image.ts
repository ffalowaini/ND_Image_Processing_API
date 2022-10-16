import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { validateFileName } from '../../middlewares/validateFileName';
import handelImageProccessing from './utilities';

const image = Router();

image.get('/', validateFileName, (req: Request, res: Response) => {
  const { fileName, height, width } = req.query;

  if (fileName) {
    const fullURL = path.join(
      __dirname,
      '../../../assets/images/full/',
      `${fileName}.jpg`
    );
    if (width && height) {
      const res1 = handelImageProccessing(
        fileName as string,
        Number(width),
        Number(height)
      );
      res.status(res1?.code as number);
      res.sendFile(res1?.url as string);
    } else {
      if (fs.existsSync(fullURL)) {
        res.status(304);
        res.sendFile(fullURL);
      } else {
        res.status(401);
        res.send('File Name Dose Not Exist');
      }
    }
  } else {
    res.status(401);
    res.send('No parameters passed');
  }
});

export default image;
