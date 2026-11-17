import { describe, expect, test } from 'bun:test';

import { ColorSpace, createColor } from '../source/color.ts';
import type { Color } from '../source/color.ts';
import { convertColor } from '../source/conversion.ts';

describe('convertColor', () => {
  test('converts sRGB to linear RGB', () => {
    const color = createColor(ColorSpace.Srgb, [1, 0.5, 0]);

    const result = convertColor(color, ColorSpace.LinearSrgb);

    expect(result satisfies Color<ColorSpace.LinearSrgb>).toEqual({
      space: ColorSpace.LinearSrgb,
      coordinates: [1, 0.21404114048223255, 0],
      alpha: 1,
    });
  });

  test('preserves alpha', () => {
    const color = createColor(ColorSpace.Srgb, [0.5, 0.5, 0.5], 0.4);

    const result = convertColor(color, ColorSpace.LinearSrgb);

    expect(result.alpha).toBe(0.4);
  });

  test('does not modify the source color', () => {
    const color = createColor(ColorSpace.Srgb, [1, 0.5, 0]);

    const result = convertColor(color, ColorSpace.LinearSrgb);

    expect(color.coordinates).toEqual([1, 0.5, 0]);
    expect(color.space).toBe(ColorSpace.Srgb);
    expect(result.coordinates).not.toBe(color.coordinates);
  });
});
