import supertest from 'supertest';
import app from '../app';

const request: supertest.SuperTest<supertest.Test> = supertest(app);
describe('Unit test response', (): void => {
  describe('endpoint: /api/img', (): void => {
    it('test get original image /api/img/encenadaport', async (): Promise<void> => {
      const res: supertest.Response = await request.get('/api/img/encenadaport');

      expect(res.status).toBe(200);
    });
    it('test image exists /api/img/test102', async (): Promise<void> => {
      const res: supertest.Response = await request.get('/api/img/test102');

      expect(res.status).toBe(404);
    });
    it('test resize image /api/img/encenadaport?width=100&height=100', async (): Promise<void> => {
      const res: supertest.Response = await request.get(
        '/api/img/encenadaport?width=100&height=100'
      );

      expect(res.status).toBe(200);
    });
    it('test height is negative number /api/img/encenadaport?width=100&height=-100', async (): Promise<void> => {
      const res: supertest.Response = await request.get(
        '/api/img/encenadaport?width=100&height=-100'
      );

      expect(res.text).toEqual('Height must be positive number');
    });

    it('test width is negative number /api/img/encenadaport?width=-100&height=100', async (): Promise<void> => {
      const res: supertest.Response = await request.get(
        '/api/img/encenadaport?width=-100&height=100'
      );

      expect(res.text).toEqual('Width must be positive number');
    });

    it('test width must be number /api/img/encenadaport?width=a&height=100', async (): Promise<void> => {
      const res: supertest.Response = await request.get('/api/img/encenadaport?width=a&height=100');
      expect(res.status).toBe(400);
    });
  });
});
