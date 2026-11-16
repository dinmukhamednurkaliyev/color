import { expect, test } from 'bun:test';

import { linearRgbToXyzD65, srgbToLinearRgb } from '../source/main.ts';

test('exposes color conversions through the public API', () => {
  const linear = srgbToLinearRgb([1, 0, 0]);
  const [x, y, z] = linearRgbToXyzD65(linear);

  expect(x).toBeCloseTo(0.4123907992659595, 12);
  expect(y).toBeCloseTo(0.21263900587151036, 12);
  expect(z).toBeCloseTo(0.01933081871559185, 12);
});
