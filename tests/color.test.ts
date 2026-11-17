import { describe, expect, test } from 'bun:test';

import { ColorSpace, createColor } from '../source/color.ts';
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

describe('createColor', () => {
  test('creates a color with default alpha', () => {
    const color = createColor(ColorSpace.Oklch, [0.7, 0.15, 240]);

    expect(color satisfies Color<ColorSpace.Oklch>).toEqual({
      space: ColorSpace.Oklch,
      coordinates: [0.7, 0.15, 240],
      alpha: 1,
    });
  });

  test('accepts custom alpha', () => {
    const color = createColor(ColorSpace.Srgb, [1, 0.5, 0], 0.4);

    expect(color).toEqual({
      space: ColorSpace.Srgb,
      coordinates: [1, 0.5, 0],
      alpha: 0.4,
    });
  });

  test('supports a missing OKLCH hue', () => {
    const color = createColor(ColorSpace.Oklch, [0.5, 0, null]);

    expect(color.coordinates[2]).toBeNull();
  });
});
