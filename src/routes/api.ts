import express from 'express';
import imgController from './api/imgController';

const apiRoutes = express.Router();
apiRoutes.use('/img', imgController);
export default apiRoutes;
