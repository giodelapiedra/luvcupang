# Cupang Love Connect (CLC)

Barangay digital governance app for **Brgy. Cupang, Muntinlupa City**.
This repo is the **Phase 0 baseline** — monorepo skeleton only. No business
features yet. Phase 1+ build on top of this foundation.

## Repo layout

```
cupang-love-connect/
├── backend/          Node.js + Express + Prisma + PostgreSQL API
├── apps/mobile/      React Native + Expo mobile app
├── packages/types/   Shared TypeScript types (backend + mobile)
├── infra/            Docker Compose + nginx config
├── .github/          CI/CD workflows
└── docs/             Architecture + phase notes
```

## Prerequisites

- Node.js **v20 LTS** (`node -v`)
- Docker Desktop **v24+** (`docker -v` and `docker compose version`)
- Git **v2.40+**

## Quick start

```bash
# 1) Install all workspace deps (root + backend + mobile + types)
npm install

# 2) Copy env template
cp backend/.env.example backend/.env

# 3) Start Postgres + API
cd infra && docker compose up -d

# 4) Run initial Prisma migration
cd ../backend && npx prisma migrate dev --name init

# 5) Verify
curl http://localhost:3000/api/v1/health
# → {"success":true,"data":{"status":"ok",...},"message":"Success","meta":null}

# 6) Launch mobile app (new terminal)
cd apps/mobile && npx expo start
```

## Verifying Phase 0

```bash
bash docs/verify-phase0.sh
```

The script runs all 8 acceptance checks. Phase 0 is done when it prints **8/8 passed**.

## Branch strategy

| Branch          | Purpose                                       |
| --------------- | --------------------------------------------- |
| `main`          | Production-ready code only                    |
| `develop`       | Integration — features merge here first       |
| `feature/p0-*`  | Phase 0 feature branches                      |
| `feature/p1-*`  | Phase 1 feature branches                      |

Never commit directly to `main`. Every change goes through a PR; CI must pass.

## Out of scope for Phase 0

Auth, JWT, OTP, file upload, push notifications, real-time, QR codes, and
production deploy are **all Phase 1+**. See `docs/phase-0.md` Section 9.
