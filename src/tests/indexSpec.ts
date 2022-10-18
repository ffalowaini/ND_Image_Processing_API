import path from 'path';
import supertest from 'supertest';
import app from '../index';
import handelImageProccessing from '../routes/api/utilities';

const request = supertest(app);

describe('Testing Image Processing Endpoints', () => {
  it('Testing render existing image', async () => {
    await request.get('/api/image?fileName=encenadaport').expect(200);
  });
  it('Testing Image Processing Function', async () => {
    expect(
      await handelImageProccessing('fjord', 200, 200).then((res) => {
        return { code: res.code, url: res.url };
      })
    ).toEqual({ code: 200, url: path.join(__dirname , '/../../assets/images/thumbnail/fjord200_200.jpg') });
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
