import { Request, Response, NextFunction } from 'express';

export const validateFileName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fileName, height, width } = req.query;

  if (fileName) {
    if (height && width) {
      const heightNum = Number(height);
      const widthNum = Number(width);

      if (!(isNaN(heightNum) || isNaN(widthNum))) {
        if (heightNum <= 0 || widthNum <= 0) {
          console.log('invalid height & width', __dirname);
          return res.status(404).send('please enter a valid height and width');
        } else {
          console.log('valid height & width');
          next();
        }
      } else {
        console.log('invalid height & width');
        return res.status(404).send('please enter a valid height and width');
      }
    } else {
      console.log('valid file name without height & width');
      next();
    }
  } else {
    console.log('no FileName found in prameters');
    return res.status(404).send('no FileName found in prameters');
  }
};
