import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Testing Image Processing Endpoints', () => {
  it('Testing render existing image', async () => {
    await request.get('/api/image?fileName=encenadaport').expect(304);
  });

  it('Testing render unexisting image', async () => {
    await request.get('/api/image?fileName=enaport').expect(401);
  });
  it('Testing Image Processing', async () => {
    await request
      .get('/api/image?fileName=encenadaport&width=212&height=455')
      .expect(200);
  });
});
