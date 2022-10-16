import { Request, Response, NextFunction } from 'express';

export const validateFileName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fileName, height, width } = req.query;

  if (fileName) {
    if (!(Number.isNaN(height) && Number.isNaN(width))) {
      next();
    } else {
      return res.status(404).send('please add a valid height and width');
    }
  } else {
    return res.status(404).send('no FileName found in prameters');
  }
};
