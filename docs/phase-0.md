# Phase 0 — Baseline Setup

Phase 0 sets up the non-negotiable foundation: monorepo, dev environment,
API skeleton, DB connection, CI/CD, and env management. **No business
features.** Phase 1+ build on top of this.

## Deliverables (acceptance map)

| #  | Deliverable           | How to verify                                                |
| -- | --------------------- | ------------------------------------------------------------ |
| D1 | Monorepo Git repo     | `backend/`, `apps/mobile/`, `packages/types/`, `infra/` all present |
| D2 | Docker dev env        | `cd infra && docker compose up -d` exits cleanly             |
| D3 | PostgreSQL via Prisma | `cd backend && npx prisma migrate dev` succeeds              |
| D4 | API skeleton          | `curl http://localhost:3000/api/v1/health` returns 200       |
| D5 | Mobile skeleton       | `npx expo start` shows 4 bottom tabs                         |
| D6 | ESLint + Prettier     | `npm run lint` passes in both `backend/` and `apps/mobile/`  |
| D7 | GitHub Actions CI     | Pushing to `develop` or PR-ing to `main` triggers green CI   |
| D8 | Env config            | `backend/.env.example` exists, Zod validates on startup      |

## Setup commands (one-time)

```bash
# Root install (uses npm workspaces — installs backend + mobile + types)
npm install

# Backend env
cp backend/.env.example backend/.env

# Start Postgres + API
cd infra && docker compose up -d

# Apply Prisma migrations
cd ../backend && npx prisma migrate dev --name init

# Sanity check
curl http://localhost:3000/api/v1/health
```

## Daily dev loop

```bash
# Terminal A — backend with hot reload
npm run dev:backend

# Terminal B — mobile (Expo Dev Tools)
npm run dev:mobile
```

## Branching

```
main           ← protected, production-ready
develop        ← integration
feature/p0-*   ← short-lived feature branches off develop
```

PRs go to `develop`. CI must pass before merge. Squash merge keeps history clean.

## Common issues

| Symptom                                  | Fix                                                          |
| ---------------------------------------- | ------------------------------------------------------------ |
| `port 5432 already in use`               | Stop local Postgres: `sudo service postgresql stop`          |
| `port 3000 already in use`               | Change `PORT` in `backend/.env` and `infra/docker-compose.yml` |
| `prisma migrate dev` fails               | Ensure DB is up: `docker compose ps` (postgres `healthy`)    |
| `env validation` crash at startup        | Check `backend/.env` against `.env.example` — missing var    |
| Expo can't reach API on physical device  | Use LAN IP, not `localhost` — `api.client.ts` already handles this |

See Section 9 of the original spec for **out of scope** items (auth, JWT,
S3, FCM, real-time, QR) — those belong in Phase 1+.
