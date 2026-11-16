import { describe, expect, test } from 'bun:test';

import { xyzD65ToOklab } from '../source/oklab.ts';

describe('xyzD65ToOklab', () => {
  test('converts black to OKLab', () => {
    expect(xyzD65ToOklab([0, 0, 0])).toEqual([0, 0, 0]);
  });

  test('converts D65 white to OKLab', () => {
    const [lightness, a, b] = xyzD65ToOklab([0.9504559270516717, 1, 1.0890577507598784]);

    expect(lightness).toBeCloseTo(1, 12);
    expect(a).toBeCloseTo(0, 12);
    expect(b).toBeCloseTo(0, 12);
  });

  test('converts red to OKLab', () => {
    const [lightness, a, b] = xyzD65ToOklab([
      0.4123907992659595, 0.21263900587151036, 0.01933081871559185,
    ]);

    expect(lightness).toBeCloseTo(0.6279553639214313, 10);
    expect(a).toBeCloseTo(0.2248630684262741, 10);
    expect(b).toBeCloseTo(0.125846277330585, 10);
  });

  test('supports negative coordinates', () => {
    const [lightness, a, b] = xyzD65ToOklab([-0.1, -0.1, -0.1]);

    expect(Number.isFinite(lightness)).toBe(true);
    expect(Number.isFinite(a)).toBe(true);
    expect(Number.isFinite(b)).toBe(true);
  });
});
