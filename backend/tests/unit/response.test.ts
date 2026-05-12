import { ok, fail, paginated } from '../../src/shared/response';

describe('response helpers', () => {
  it('ok() wraps data in a successful envelope', () => {
    const result = ok({ x: 1 }, 'done');
    expect(result).toEqual({ success: true, data: { x: 1 }, message: 'done', meta: null });
  });

  it('ok() defaults the message to "Success"', () => {
    expect(ok(null).message).toBe('Success');
  });

  it('fail() returns a failure envelope with null data', () => {
    expect(fail('nope')).toEqual({
      success: false,
      data: null,
      message: 'nope',
      meta: null,
    });
  });

  it('paginated() embeds page metadata', () => {
    const result = paginated([1, 2, 3], 2, 10, 23);
    expect(result.success).toBe(true);
    expect(result.data).toEqual([1, 2, 3]);
    expect(result.meta).toEqual({ page: 2, limit: 10, total: 23 });
  });
});
