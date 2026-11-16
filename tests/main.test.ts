import { expect, test } from 'bun:test';

import {
  linearRgbToSrgb,
  linearToSrgbChannel,
  type RgbChannels,
  srgbToLinearChannel,
  srgbToLinearRgb,
} from '../source/main.ts';

test('converts black and white', () => {
  expect(srgbToLinearChannel(0)).toBe(0);
  expect(srgbToLinearChannel(1)).toBe(1);

  expect(linearToSrgbChannel(0)).toBe(0);
  expect(linearToSrgbChannel(1)).toBeCloseTo(1, 12);
});

test('converts an sRGB midpoint', () => {
  expect(srgbToLinearChannel(0.5)).toBeCloseTo(0.21404114048223255, 12);

  expect(linearToSrgbChannel(0.21404114048223255)).toBeCloseTo(0.5, 12);
});

test('preserves negative values', () => {
  expect(srgbToLinearChannel(-0.5)).toBeCloseTo(-0.21404114048223255, 12);

  expect(linearToSrgbChannel(-0.21404114048223255)).toBeCloseTo(-0.5, 12);
});

test('converts the linear segment', () => {
  expect(linearToSrgbChannel(0.002)).toBeCloseTo(0.02584, 12);
});

test('preserves out-of-range values', () => {
  const channel = 1.25;

  const linear = srgbToLinearChannel(channel);
  const converted = linearToSrgbChannel(linear);

  expect(converted).toBeCloseTo(channel, 12);
});

test('preserves values through round-trip conversion', () => {
  const channels = [-0.5, 0, 0.01, 0.1, 0.25, 0.5, 0.75, 1, 1.25];

  for (const channel of channels) {
    const linear = srgbToLinearChannel(channel);
    const converted = linearToSrgbChannel(linear);

    expect(converted).toBeCloseTo(channel, 12);
  }
});

test('converts three sRGB channels independently', () => {
  const linear = srgbToLinearRgb([1, 0.5, 0]);

  expect(linear[0]).toBe(1);
  expect(linear[1]).toBeCloseTo(0.21404114048223255, 12);
  expect(linear[2]).toBe(0);
});

test('converts three linear RGB channels', () => {
  const srgb = linearRgbToSrgb([0, 0.21404114048223255, 1]);

  expect(srgb[0]).toBe(0);
  expect(srgb[1]).toBeCloseTo(0.5, 12);
  expect(srgb[2]).toBeCloseTo(1, 12);
});

test('preserves RGB channels through round-trip conversion', () => {
  const original: RgbChannels = [0.25, 0.5, 0.75];

  const linear = srgbToLinearRgb(original);
  const converted = linearRgbToSrgb(linear);

  expect(converted[0]).toBeCloseTo(original[0], 12);
  expect(converted[1]).toBeCloseTo(original[1], 12);
  expect(converted[2]).toBeCloseTo(original[2], 12);
});

test('does not modify the original RGB channels', () => {
  const original: RgbChannels = [0.25, 0.5, 0.75];

  srgbToLinearRgb(original);

  expect(original).toEqual([0.25, 0.5, 0.75]);
});
