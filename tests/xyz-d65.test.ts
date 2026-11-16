import { describe, expect, test } from 'bun:test';

import { linearRgbToXyzD65, xyzD65ToLinearRgb } from '../source/xyz-d65.ts';

describe('linearRgbToXyzD65', () => {
  test('converts black to XYZ', () => {
    expect(linearRgbToXyzD65([0, 0, 0])).toEqual([0, 0, 0]);
  });

  test('converts red to XYZ', () => {
    const [x, y, z] = linearRgbToXyzD65([1, 0, 0]);

    expect(x).toBeCloseTo(0.4123907992659595, 12);
    expect(y).toBeCloseTo(0.21263900587151036, 12);
    expect(z).toBeCloseTo(0.01933081871559185, 12);
  });

  test('converts white to the D65 reference white', () => {
    const [x, y, z] = linearRgbToXyzD65([1, 1, 1]);

    expect(x).toBeCloseTo(0.9504559270516717, 12);
    expect(y).toBeCloseTo(1, 12);
    expect(z).toBeCloseTo(1.0890577507598784, 12);
  });
});

describe('xyzD65ToLinearRgb', () => {
  test('converts black to linear RGB', () => {
    expect(xyzD65ToLinearRgb([0, 0, 0])).toEqual([0, 0, 0]);
  });

  test('converts XYZ red to linear RGB', () => {
    const [red, green, blue] = xyzD65ToLinearRgb([
      0.4123907992659595, 0.21263900587151036, 0.01933081871559185,
    ]);

    expect(red).toBeCloseTo(1, 12);
    expect(green).toBeCloseTo(0, 12);
    expect(blue).toBeCloseTo(0, 12);
  });

  test('preserves RGB after an XYZ round-trip', () => {
    const original = [0.25, 0.5, 0.75] as const;

    const xyz = linearRgbToXyzD65(original);
    const restored = xyzD65ToLinearRgb(xyz);

    original.forEach((channel, index) => {
      expect(restored[index]).toBeCloseTo(channel, 12);
    });
  });
});
