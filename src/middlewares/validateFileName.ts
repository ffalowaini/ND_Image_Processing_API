import { Request, Response, NextFunction } from 'express';

export const validateFileName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fileName } = req.query;

  if (fileName) {
    next();
  } else {
    return res.status(404).send('no FileName found in prameters');
  }
};
