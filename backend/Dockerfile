# ─── Stage 1: builder ────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Copy lockfiles for cached install
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma

RUN npm ci

COPY src ./src

# Generate Prisma client + compile TS
RUN npx prisma generate
RUN npm run build

# ─── Stage 2: runtime ────────────────────────────────
FROM node:20-alpine AS runtime
WORKDIR /app

# Non-root user for security
RUN addgroup -S clc && adduser -S clc -G clc

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

USER clc

EXPOSE 3000

CMD ["node", "dist/server.js"]
