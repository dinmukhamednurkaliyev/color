import { expect, test } from 'bun:test';

import { linearToSrgbChannel, srgbToLinearChannel } from '../source/main.ts';

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
