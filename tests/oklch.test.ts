import { describe, expect, test } from 'bun:test';

import { oklabToOklch, oklchToOklab } from '../source/oklch.ts';

describe('oklabToOklch', () => {
  test('preserves lightness and calculates chroma', () => {
    const [lightness, chroma, hue] = oklabToOklch([0.6, 0.3, 0.4]);

    expect(lightness).toBe(0.6);
    expect(chroma).toBeCloseTo(0.5, 12);
    expect(hue).toBeCloseTo(53.13010235415598, 10);
  });

  test('normalizes a negative angle', () => {
    const [, , hue] = oklabToOklch([0.5, 0, -0.2]);

    expect(hue).toBeCloseTo(270, 12);
  });

  test('treats a neutral color as having no hue', () => {
    expect(oklabToOklch([0.5, 0, 0])).toEqual([0.5, 0, null]);
  });

  test('removes near-neutral chroma', () => {
    expect(oklabToOklch([0.5, 0.000002, 0])).toEqual([0.5, 0, null]);
  });
});

describe('oklchToOklab', () => {
  test('converts hue from degrees to coordinates', () => {
    const [lightness, a, b] = oklchToOklab([0.6, 0.2, 90]);

    expect(lightness).toBe(0.6);
    expect(a).toBeCloseTo(0, 12);
    expect(b).toBeCloseTo(0.2, 12);
  });

  test('converts a missing hue to neutral channels', () => {
    expect(oklchToOklab([0.5, 0, null])).toEqual([0.5, 0, 0]);
  });

  test('preserves OKLab coordinates after a round-trip', () => {
    const original = [0.65, 0.12, -0.08] as const;

    const oklch = oklabToOklch(original);
    const restored = oklchToOklab(oklch);

    original.forEach((channel, index) => {
      expect(restored[index]).toBeCloseTo(channel, 12);
    });
  });
});
