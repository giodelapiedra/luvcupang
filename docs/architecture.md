# Architecture — Cupang Love Connect

## High-level

```
┌─────────────────────┐         HTTPS         ┌─────────────────────┐
│   Mobile (Expo)     │  ───────────────────► │   nginx (prod)      │
│   React Native      │                       │   reverse proxy     │
│   Expo Router       │                       └─────────┬───────────┘
│   NativeWind        │                                 │
│   Zustand · RQuery  │                                 ▼
│   Axios             │                       ┌─────────────────────┐
└─────────────────────┘                       │   Node.js API       │
                                              │   Express v4        │
                                              │   Helmet · CORS     │
                                              │   Rate Limit · Zod  │
                                              │   Winston · Morgan  │
                                              └─────────┬───────────┘
                                                        │ Prisma
                                                        ▼
                                              ┌─────────────────────┐
                                              │   PostgreSQL 15     │
                                              └─────────────────────┘
```

## Layers (backend)

```
src/
├── config/      — env (Zod), Prisma singleton, constants
├── shared/      — logger, ApiResponse helpers (ok/fail/paginated)
├── middleware/  — errorHandler, notFound, requestLogger (x-request-id)
├── modules/     — feature folders, each owns controller + routes
│                  Phase 0 only ships /health.
└── routes/      — central router that mounts every module under /api/<v>
```

`app.ts` builds the Express instance (factory pattern, exported for
Supertest). `server.ts` is the only place we call `app.listen()` — it also
wires SIGINT/SIGTERM to a graceful shutdown that closes the HTTP server and
the Prisma pool.

## Response envelope (every endpoint)

```ts
type ApiResponse<T> = {
  success: boolean;
  data:    T | null;
  message: string;
  meta:    { page?: number; limit?: number; total?: number } | null;
};
```

The mobile app can rely on this shape unconditionally. Errors *also* use it
(with `success: false`).

## Observability

- **Request ID** — `X-Request-Id` header (uuidv4 if client doesn't send one).
  Echoed back, logged on every request, and included on every error log.
- **Structured logs** — Winston JSON in non-dev, colorized simple in dev.
- **Health endpoint** — exposes env + DB reachability so a load balancer can
  distinguish "app is up but DB is dead" from "app is dead".

## Security baseline

- `helmet()` sets HSTS, X-Content-Type-Options, X-Frame-Options, etc.
- `cors()` restricted to `CORS_ORIGIN` from env.
- `express-rate-limit` — 100 req/min/IP (raise per-route in Phase 1).
- `x-powered-by` disabled.
- Body limit 10 MB.
- Phase 1 adds JWT guards, role middleware, and per-route rate limits.

## Mobile layers

```
src/
├── app/         — Expo Router file-tree (routes)
│   ├── (auth)/  — group, no tab bar
│   └── (tabs)/  — group, bottom tab navigator (4 tabs)
├── components/
│   ├── ui/      — Button, Card, Input (atoms)
│   └── layout/  — ScreenWrapper
├── services/    — api.client.ts (Axios + auth interceptor)
├── store/       — Zustand global state
├── hooks/       — custom hooks
├── constants/   — colors, routes, config (incl. API_BASE_URL)
└── utils/       — formatting helpers
```

State is intentionally split: **server state** lives in React Query;
**UI/global state** lives in Zustand. Don't mix them — RQ already handles
caching, staleness, retries, and refetch-on-focus.
