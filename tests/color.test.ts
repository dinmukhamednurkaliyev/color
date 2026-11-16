import { describe, expect, test } from 'bun:test';

import { ColorSpace } from '../source/color.ts';
import type { Color } from '../source/color.ts';

describe('ColorSpace', () => {
  test('defines stable identifiers', () => {
    expect(ColorSpace).toMatchObject({
      Srgb: 'srgb',
      LinearSrgb: 'srgb-linear',
      XyzD65: 'xyz-d65',
      Oklab: 'oklab',
      Oklch: 'oklch',
    });
  });
});

describe('Color', () => {
  test('represents typed OKLCH coordinates', () => {
    const color = {
      space: ColorSpace.Oklch,
      coordinates: [0.7, 0.15, 240],
      alpha: 1,
    } satisfies Color;

    expect(color.space).toBe(ColorSpace.Oklch);
    expect(color.coordinates).toEqual([0.7, 0.15, 240]);
    expect(color.alpha).toBe(1);
  });
});
