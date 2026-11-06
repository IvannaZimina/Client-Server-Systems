// C06 Ex3 — Express routes

import express from 'express';
import { wrap } from '../materials/express-helpers.js';

// Ошибка с HTTP-статусом для общего обработчика ошибок
function httpError(code, message) {
  const error = new Error(message);
  error.status = code;
  return error;
}

// Маршруты событий
export function eventsRouter(store) {
  const router = express.Router();

  // GET /api/events?search=...
  router.get('/', wrap(async (req, res) => {
    const events = await store.events(req.query.search ?? '');
    res.json(events);
  }));

  // Конкретный маршрут должен быть раньше /:id
  // GET /api/events/popular
  router.get('/popular', wrap(async (req, res) => {
    const event = await store.event(2);
    res.json(event ? [event] : []);
  }));

  // GET /api/events/:id
  router.get('/:id', wrap(async (req, res) => {
    if (!/^\d+$/.test(req.params.id)) {
      throw httpError(400, 'Vigane sündmuse ID');
    }

    const event = await store.event(Number(req.params.id));

    if (!event) {
      throw httpError(404, 'Sündmust ei leitud');
    }

    res.json(event);
  }));

  // PATCH /api/events/:id
  router.patch('/:id', wrap(async (req, res) => {
    if (!/^\d+$/.test(req.params.id)) {
      throw httpError(400, 'Vigane sündmuse ID');
    }

    const event = await store.updateEvent(
      Number(req.params.id),
      req.body ?? {}
    );

    if (!event) {
      throw httpError(404, 'Sündmust ei leitud');
    }

    res.json(event);
  }));

  return router;
}

// Маршруты заказов
export function ordersRouter(store) {
  const router = express.Router();

  // GET /api/orders
  router.get('/', wrap(async (req, res) => {
    const orders = await store.orders();
    res.json(orders);
  }));

  // POST /api/orders
  router.post('/', wrap(async (req, res) => {
    const body = req.body;

    // Проверка обязательных полей
    if (
      !body ||
      typeof body !== 'object' ||
      Array.isArray(body) ||
      body.event === undefined ||
      body.qty === undefined
    ) {
      throw httpError(
        422,
        'Puuduvad kohustuslikud väljad: event, qty'
      );
    }

    const eventId = Number(body.event);
    const qty = Number(body.qty);

    // Проверка значений
    if (
      !Number.isInteger(eventId) ||
      !Number.isInteger(qty) ||
      qty < 1
    ) {
      throw httpError(422, 'Vigased tellimuse andmed');
    }

    const event = await store.event(eventId);

    // Несуществующее событие — ошибка входных данных
    if (!event) {
      throw httpError(422, 'Sündmust ei leitud');
    }

    // Недостаточно свободных мест — конфликт состояния
    if (event.sold + qty > event.seats) {
      throw httpError(409, 'Vabu kohti ei ole piisavalt');
    }

    const order = await store.addOrder({
      event: eventId,
      qty
    });

    res
      .location(`/api/orders/${order.id}`)
      .status(201)
      .json(order);
  }));

  // DELETE /api/orders/:id
  router.delete('/:id', wrap(async (req, res) => {
    if (!/^\d+$/.test(req.params.id)) {
      throw httpError(404, 'Tellimust ei leitud');
    }

    const removed = await store.removeOrder(Number(req.params.id));

    if (!removed) {
      throw httpError(404, 'Tellimust ei leitud');
    }

    res.status(204).end();
  }));

  return router;
}