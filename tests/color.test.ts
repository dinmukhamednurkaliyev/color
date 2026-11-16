import { describe, expect, test } from 'bun:test';

import { ColorSpace } from '../source/color.ts';
import type { Color } from '../source/color.ts';

describe('Color', () => {
  test('represents an OKLCH color', () => {
    const color: Color = {
      space: ColorSpace.Oklch,
      channels: [0.7, 0.18, 250],
      alpha: 1,
    };

    expect(color.space).toBe(ColorSpace.Oklch);
    expect(color.channels).toEqual([0.7, 0.18, 250]);
    expect(color.alpha).toBe(1);
  });

  test('supports colors with undefined hue', () => {
    const color: Color = {
      space: ColorSpace.Oklch,
      channels: [0.5, 0, null],
      alpha: 0.5,
    };

    expect(color.channels[2]).toBeNull();
    expect(color.alpha).toBe(0.5);
  });
});
