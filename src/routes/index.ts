import express , {Request, Response}from 'express';
import image from './api/image';

const routes = express.Router();

routes.use('/image', image);

routes.get('/', (req: Request, res: Response) => {
  res.status(401);
});

routes.get('/info', (req: Request, res: Response) => {
  res.status(200).send('The server works proparly');
});

export default routes;
