import 'dotenv/config';
import express from 'express';
import { resolve } from 'path';
import cors from 'cors';
import { Server } from 'http';
import socketIo from 'socket.io';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = Server(this.app);
    this.io = socketIo(this.server);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use((req, res, next) => {
      req.io = this.io;

      next();
    });

    this.app.use(cors());

    this.app.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads', 'resized')),
    );
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;
