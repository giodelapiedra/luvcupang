#!/usr/bin/env bash
# Phase 0 verification script — runs the automatable subset of the
# acceptance criteria and prints a final PASS/FAIL summary.
# Exit code: 0 if all checks pass, 1 otherwise (so CI can gate on it).

set -u

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

PASS=0
FAIL=0
TOTAL=8

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root" || exit 1

run_check() {
  local label="$1"
  shift
  printf "%-50s" "$label"
  if "$@" >/dev/null 2>&1; then
    printf "${GREEN}PASS${NC}\n"
    PASS=$((PASS + 1))
  else
    printf "${RED}FAIL${NC}\n"
    FAIL=$((FAIL + 1))
  fi
}

echo -e "${YELLOW}Phase 0 verification — Cupang Love Connect${NC}"
echo "─────────────────────────────────────────────────────────"

# 1. Docker Compose stack up
run_check "1. docker compose up (infra)" \
  bash -c "cd infra && docker compose up -d"

# 2. Postgres healthy
run_check "2. Postgres healthcheck" \
  bash -c "cd infra && docker compose ps --status running | grep -q clc-postgres"

# 3. Health endpoint returns 200
run_check "3. GET /api/v1/health → 200" \
  bash -c "[[ \$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/api/v1/health) == '200' ]]"

# 4. Prisma migrations folder non-empty
run_check "4. Prisma migrations present" \
  bash -c "[[ -d backend/prisma/migrations ]] && [[ \$(ls -A backend/prisma/migrations 2>/dev/null | wc -l) -gt 0 ]]"

# 5. Backend lint
run_check "5. backend npm run lint" \
  bash -c "cd backend && npm run lint"

# 6. Backend tests
run_check "6. backend npm test" \
  bash -c "cd backend && npm test"

# 7. Mobile type-check
run_check "7. mobile tsc --noEmit" \
  bash -c "cd apps/mobile && npx tsc --noEmit"

# 8. Mobile lint
run_check "8. mobile npm run lint" \
  bash -c "cd apps/mobile && npm run lint"

echo "─────────────────────────────────────────────────────────"
if [[ "$FAIL" -eq 0 ]]; then
  echo -e "${GREEN}${PASS}/${TOTAL} checks passed${NC} — Phase 0 ✅"
  exit 0
else
  echo -e "${RED}${PASS}/${TOTAL} checks passed — ${FAIL} failed${NC} — Phase 0 ❌"
  exit 1
fi
