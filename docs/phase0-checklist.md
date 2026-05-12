# Phase 0 — Verification Checklist

Tick every box before starting Phase 1. Run the script for the automated subset:

```bash
bash docs/verify-phase0.sh
```

## Manual + scripted checks (the 14 from the spec)

- [ ] **Git** — repo initialized with `main` + `develop`, `.gitignore` committed
  `git log --oneline | head -5`
- [ ] **Git** — no `.env` files tracked
  `git ls-files | grep -E "(^|/)\.env$"`  → must be empty
- [ ] **Docker** — `cd infra && docker compose up -d` exits 0
- [ ] **Database** — `docker compose ps` shows `clc-postgres` `healthy`
- [ ] **Database** — `ls backend/prisma/migrations/` has at least one folder
- [ ] **API** — `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/v1/health` → `200`
- [ ] **API** — unknown route returns 404 with `{ success: false, ... }`
  `curl http://localhost:3000/api/v1/unknown`
- [ ] **API** — `cd backend && npm run lint` → 0 errors
- [ ] **Tests** — `cd backend && npm test` → all pass
- [ ] **Mobile** — `cd apps/mobile && npx expo start` shows 4 bottom tabs on simulator
- [ ] **Mobile** — `cd apps/mobile && npm run type-check` → 0 errors
- [ ] **Mobile** — `cd apps/mobile && npm run lint` → 0 errors
- [ ] **CI/CD** — pushing to GitHub triggers green workflows under Actions tab
- [ ] **Config** — `cat backend/.env.example` shows all required keys, no secret values

## Common errors and fixes

### `Error: P1001: Can't reach database server at localhost:5432`
Postgres container isn't healthy yet, or another local Postgres is bound to 5432.
```bash
docker compose -f infra/docker-compose.yml ps
# If a local pg is running:
sudo service postgresql stop  # macOS: brew services stop postgresql
```

### `Error: Invalid environment variables: { DATABASE_URL: [ 'Required' ] }`
You forgot to copy the env template:
```bash
cp backend/.env.example backend/.env
```

### `Address already in use :::3000`
Another process is on port 3000. Either kill it or change `PORT` in `.env`.
```bash
lsof -i :3000   # find pid
kill -9 <pid>
```

### Expo: `Could not connect to development server` on a physical device
Phone is on a different Wi-Fi than the dev machine. Same network = required.
`api.client.ts` already derives the LAN IP from Expo's `hostUri`, so you don't
need to hardcode anything.

### `npm ERR! workspace mobile not found` during `npm install`
Run `npm install` from the **repo root**, not from inside `apps/mobile`.

## Ready signal

When the verify script prints **`8/8 checks passed`** and every manual box
above is ticked, Phase 0 is done. You may start Phase 1 (Auth + Digital ID).
