# KT_5 — Asynchronous JavaScript and fetch

The control work implements all six C05 exercises:

- [Event loop](docs/loop.md)
- [Promises and async/await](docs/promises.md)
- [Fetch states and errors](docs/fetch.md)
- [Cancellation, timeout and retry](docs/aborting.md)
- [Client API layer](docs/api-layer.md)
- [Service worker and offline tickets](docs/service-worker.md)

Run the focused checks from this directory:

```text
npm --prefix materials install
node materials/server.js
npm run check:promises
npm run check:request
npm run check:abort
npm run check:api
npm run check:sw
```

The supplied server listens on `http://localhost:3055`. Its deliberate test
cases are `?slow`, `?err`, `?broken`, `?empty`, `?loss` and `?retry`.
