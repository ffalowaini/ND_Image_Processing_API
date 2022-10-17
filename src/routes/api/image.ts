import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { validateFileName } from '../../middlewares/validateFileName';
import handelImageProccessing from './utilities';

const image = Router();

image.get('/', validateFileName, async (req: Request, res: Response) => {
  const { fileName, height, width } = req.query;

  if (fileName) {
    console.log('file name valid');
    const fullURL = path.join(
      __dirname,
      '../../../assets/images/full/',
      `${fileName}.jpg`
    );
    if (width && height) {
      console.log('widht & height valid');
      const res1 = await handelImageProccessing(
        fileName as string,
        Number(width),
        Number(height)
      );
      console.log('file name -> ' + res1?.url);
      res.status(res1?.code as number);
      res.sendFile(res1?.url as string);

    } else {
      if (fs.existsSync(fullURL)) {
        console.log('file name exist -> ' + fullURL);
        res.status(200);
        res.sendFile(fullURL);
      } else {
        console.log('File Name Dose Not Exist');
        res.status(401);
        res.send('File Name Dose Not Exist');
      }
    }
  } else {
    console.log('File Name Dose Not   passed');
    res.status(401);
    res.send('No parameters passed');
  }
});

export default image;
