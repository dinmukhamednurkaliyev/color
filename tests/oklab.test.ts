import { describe, expect, test } from 'bun:test';

import { oklabToXyzD65, xyzD65ToOklab } from '../source/oklab.ts';

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
    const result = xyzD65ToOklab([-0.1, -0.1, -0.1]);

    for (const channel of result) {
      expect(Number.isFinite(channel)).toBe(true);
    }
  });
});

describe('oklabToXyzD65', () => {
  test('converts black to XYZ D65', () => {
    expect(oklabToXyzD65([0, 0, 0])).toEqual([0, 0, 0]);
  });

  test('converts white to the D65 reference white', () => {
    const [x, y, z] = oklabToXyzD65([1, 0, 0]);

    expect(x).toBeCloseTo(0.9504559270516717, 12);
    expect(y).toBeCloseTo(1, 12);
    expect(z).toBeCloseTo(1.0890577507598784, 12);
  });

  test('converts OKLab red to XYZ D65', () => {
    const [x, y, z] = oklabToXyzD65([0.6279553639214313, 0.2248630684262741, 0.125846277330585]);

    expect(x).toBeCloseTo(0.4123907992659595, 12);
    expect(y).toBeCloseTo(0.21263900587151036, 12);
    expect(z).toBeCloseTo(0.01933081871559185, 12);
  });

  test('preserves XYZ after a round-trip', () => {
    const original = [0.25, 0.4, 0.6] as const;

    const oklab = xyzD65ToOklab(original);
    const restored = oklabToXyzD65(oklab);

    original.forEach((channel, index) => {
      expect(restored[index]).toBeCloseTo(channel, 12);
    });
  });

  test('preserves negative XYZ coordinates', () => {
    const original = [-0.1, 0.4, 0.6] as const;

    const oklab = xyzD65ToOklab(original);
    const restored = oklabToXyzD65(oklab);

    original.forEach((channel, index) => {
      expect(restored[index]).toBeCloseTo(channel, 12);
    });
  });
});
