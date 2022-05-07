import supertest from 'supertest';
import app from '../app';
import handleImg from '../handle/handleImg';
import path from 'path';

const request: supertest.SuperTest<supertest.Test> = supertest(app);
describe('Unit test', (): void => {
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
  describe('Unit test function validator', (): void => {
    it('Function validator width or height is negative number', () => {
      const msgError = handleImg.validatorNumberWidthOrHeight("-200");
      expect(msgError).toEqual("must be positive number");
    });
    it('Function validator width or height is string', () => {
      const msgError = handleImg.validatorNumberWidthOrHeight("a200");
      expect(msgError).toEqual("must be number");
    });
    it('Function check exists file or directory', () => {
  
      const msgError = handleImg.existFileOrDirectory(path.resolve(__dirname, `../../../assets/img/img.png`));
      expect(msgError).toEqual("not found");
    });
  
    it('Function resize image does not exist in the system ', async () => {
  
      const result = await handleImg.resizeImg(path.resolve(__dirname, `../../../assets/img/png.jpg`),"200","200",path.resolve(__dirname, `../../../assets/img/png-200x200.jpg`));
      expect(result).toBeFalse();
    });
  })
  
});
