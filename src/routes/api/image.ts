import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { validateFileName } from '../../middlewares/validateFileName';

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
      const thumbilURL = path.join(
        __dirname,
        '../../../assets/images/thumbil/',
        `${fileName}${height}_${width}.jpg`
      );
      if (fs.existsSync(thumbilURL)) {
        res.status(200);
        res.sendFile(thumbilURL);
      } else {
        sharp(fullURL)
          .resize(Number(width), Number(height))
          .toFile(thumbilURL, () => {
            res.status(304);
            res.sendFile(thumbilURL);
          });
      }
    } else {
      const fullURL = path.join(
        __dirname,
        '../../../assets/images/full/',
        `${fileName}.jpg`
      );
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
