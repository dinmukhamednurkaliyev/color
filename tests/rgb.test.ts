import { describe, expect, test } from 'bun:test';

import {
  linearRgbToSrgb,
  linearToSrgbChannel,
  srgbToLinearChannel,
  srgbToLinearRgb,
} from '../source/rgb.ts';

describe('srgbToLinearChannel', () => {
  test('converts black and white', () => {
    expect(srgbToLinearChannel(0)).toBe(0);
    expect(srgbToLinearChannel(1)).toBe(1);
  });

  test('converts values in the linear segment', () => {
    expect(srgbToLinearChannel(0.02)).toBeCloseTo(0.02 / 12.92, 12);
  });

  test('converts values in the nonlinear segment', () => {
    expect(srgbToLinearChannel(0.5)).toBeCloseTo(0.21404114048223255, 12);
  });

  test('preserves negative values', () => {
    expect(srgbToLinearChannel(-0.5)).toBeCloseTo(-0.21404114048223255, 12);
  });
});

describe('linearToSrgbChannel', () => {
  test('converts black and white', () => {
    expect(linearToSrgbChannel(0)).toBe(0);
    expect(linearToSrgbChannel(1)).toBeCloseTo(1, 12);
  });

  test('converts values in the linear segment', () => {
    expect(linearToSrgbChannel(0.002)).toBeCloseTo(0.02584, 12);
  });

  test('converts values in the nonlinear segment', () => {
    expect(linearToSrgbChannel(0.21404114048223255)).toBeCloseTo(0.5, 12);
  });

  test('preserves negative values', () => {
    expect(linearToSrgbChannel(-0.21404114048223255)).toBeCloseTo(-0.5, 12);
  });
});

describe('RGB channel conversions', () => {
  test('converts all three sRGB channels', () => {
    const [red, green, blue] = srgbToLinearRgb([1, 0.5, 0]);

    expect(red).toBeCloseTo(1, 12);
    expect(green).toBeCloseTo(0.21404114048223255, 12);
    expect(blue).toBe(0);
  });

  test('converts all three linear RGB channels', () => {
    const [red, green, blue] = linearRgbToSrgb([1, 0.21404114048223255, 0]);

    expect(red).toBeCloseTo(1, 12);
    expect(green).toBeCloseTo(0.5, 12);
    expect(blue).toBe(0);
  });

  test('preserves RGB channels after a round-trip', () => {
    const original = [0.25, 0.5, 0.75] as const;

    const linear = srgbToLinearRgb(original);
    const restored = linearRgbToSrgb(linear);

    original.forEach((channel, index) => {
      expect(restored[index]).toBeCloseTo(channel, 12);
    });
  });

  test('preserves extended RGB values', () => {
    const original = [-0.5, 0.5, 1.5] as const;

    const linear = srgbToLinearRgb(original);
    const restored = linearRgbToSrgb(linear);

    original.forEach((channel, index) => {
      expect(restored[index]).toBeCloseTo(channel, 12);
    });
  });
});
