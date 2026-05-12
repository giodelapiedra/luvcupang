import request from 'supertest';
import { createApp } from '../../src/app';
import { prisma } from '../../src/config/database';

const app = createApp();

afterAll(async () => {
  await prisma.$disconnect();
});

describe('GET /api/v1/health', () => {
  it('returns 200 with the standard ApiResponse envelope', async () => {
    const res = await request(app).get('/api/v1/health');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      success: true,
      message: 'Success',
      meta: null,
      data: {
        status: 'ok',
        environment: expect.any(String),
        timestamp: expect.any(String),
        database: expect.stringMatching(/^(reachable|unreachable)$/),
      },
    });
  });

  it('sets an X-Request-Id response header', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.headers['x-request-id']).toMatch(/[0-9a-f-]{36}/i);
  });
});

describe('unknown route', () => {
  it('returns 404 with the standard error envelope', async () => {
    const res = await request(app).get('/api/v1/this-does-not-exist');

    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({
      success: false,
      data: null,
      meta: null,
    });
    expect(res.body.message).toMatch(/Route not found/);
  });
});
