// C06 Ex3 — Express application

import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { requestId } from './middleware.js';
import { eventsRouter, ordersRouter } from './routes.js';

import { logger } from '../materials/logger.js';
import {
  notFound,
  wrap
} from '../materials/express-helpers.js';

import {
  errorHandler,
  simpleResponse
} from '../materials/error-middleware.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp(store, { log = console.log } = {}) {
  const app = express();

  app.use(requestId());

  app.use(logger(log));

  app.use(express.json({ limit: '10kb' }));

  app.use(express.static(path.resolve(__dirname, '../public')));

  app.use('/api/events', eventsRouter(store));

  app.use('/api/orders', ordersRouter(store));

  app.get('/api/health', wrap(async (req, res) => {
    res.json({ status: 'ok' });
  }));

  app.use(notFound);

  app.use(errorHandler(simpleResponse, log));

  return app;
}