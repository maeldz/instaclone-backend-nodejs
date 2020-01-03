import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import PostController from './app/controllers/PostController';
import LikeController from './app/controllers/LikeController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/posts', upload.single('image'), PostController.store);
routes.get('/posts', PostController.index);

routes.post('/posts/:id/like', LikeController.store);

export default routes;
