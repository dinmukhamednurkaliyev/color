import { expect, test } from 'bun:test';

import { ColorSpace, createColor } from '../source/color.ts';
import type { OklabChannels } from '../source/oklab.ts';
import type { OklchChannels } from '../source/oklch.ts';
import { srgbToLinearRgb } from '../source/rgb.ts';
import type { LinearRgbChannels, RgbChannels } from '../source/rgb.ts';
import { linearRgbToXyzD65 } from '../source/xyz-d65.ts';
import type { XyzD65Channels } from '../source/xyz-d65.ts';

type IsAssignable<Source, Target> = [Source] extends [Target] ? true : false;

test('keeps color-space channel types distinct', () => {
  const srgbIsLinear: IsAssignable<RgbChannels, LinearRgbChannels> = false;

  const rgbIsXyz: IsAssignable<RgbChannels, XyzD65Channels> = false;

  const oklabIsOklch: IsAssignable<OklabChannels, OklchChannels> = false;

  expect(srgbIsLinear).toBe(false);
  expect(rgbIsXyz).toBe(false);
  expect(oklabIsOklch).toBe(false);
});

test('preserves raw channel representation', () => {
  const color = createColor(ColorSpace.Srgb, [1, 0, 0]);

  const linear = srgbToLinearRgb(color.coordinates);
  const xyz = linearRgbToXyzD65(linear);

  expect(xyz[0]).toBeCloseTo(0.4123907992659595, 12);
  expect(xyz[1]).toBeCloseTo(0.21263900587151036, 12);
  expect(xyz[2]).toBeCloseTo(0.01933081871559185, 12);
});
