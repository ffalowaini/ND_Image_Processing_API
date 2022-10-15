import express from 'express';
import routes from './routes';

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`project started on port  ${port}`);
});

app.use('/api', routes);

export default app;
