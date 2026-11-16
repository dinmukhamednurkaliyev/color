import { expect, test } from 'bun:test';

import {
  linearRgbToSrgb,
  linearRgbToXyzD65,
  linearToSrgbChannel,
  type RgbChannels,
  srgbToLinearChannel,
  srgbToLinearRgb,
  type XyzD65Channels,
  xyzD65ToLinearRgb,
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

test('converts black to XYZ D65', () => {
  expect(linearRgbToXyzD65([0, 0, 0])).toEqual([0, 0, 0]);
});

test('converts white to the D65 reference white', () => {
  const [x, y, z] = linearRgbToXyzD65([1, 1, 1]);

  expect(x).toBeCloseTo(0.9504559270516717, 12);
  expect(y).toBeCloseTo(1, 12);
  expect(z).toBeCloseTo(1.0890577507598784, 12);
});

test('converts linear red to XYZ D65', () => {
  const [x, y, z] = linearRgbToXyzD65([1, 0, 0]);

  expect(x).toBeCloseTo(0.4123907992659595, 12);
  expect(y).toBeCloseTo(0.21263900587151036, 12);
  expect(z).toBeCloseTo(0.01933081871559185, 12);
});

test('preserves the original linear RGB channels', () => {
  const original: RgbChannels = [0.25, 0.5, 0.75];

  linearRgbToXyzD65(original);

  expect(original).toEqual([0.25, 0.5, 0.75]);
});

test('converts XYZ black to linear RGB', () => {
  expect(xyzD65ToLinearRgb([0, 0, 0])).toEqual([0, 0, 0]);
});

test('converts the D65 reference white to linear RGB', () => {
  const rgb = xyzD65ToLinearRgb([0.9504559270516717, 1, 1.0890577507598784]);

  expect(rgb[0]).toBeCloseTo(1, 12);
  expect(rgb[1]).toBeCloseTo(1, 12);
  expect(rgb[2]).toBeCloseTo(1, 12);
});

test('converts XYZ coordinates of RGB primaries', () => {
  const primaries: readonly RgbChannels[] = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];

  const xyzPrimaries: readonly XyzD65Channels[] = [
    [0.4123907992659595, 0.21263900587151036, 0.01933081871559185],
    [0.357584339383878, 0.7151686787677559, 0.119194779794626],
    [0.1804807884018343, 0.07219231536073371, 0.9505321522496606],
  ];

  for (let index = 0; index < primaries.length; index++) {
    const expected = primaries[index]!;
    const xyz = xyzPrimaries[index]!;

    const actual = xyzD65ToLinearRgb(xyz);

    expect(actual[0]).toBeCloseTo(expected[0], 12);
    expect(actual[1]).toBeCloseTo(expected[1], 12);
    expect(actual[2]).toBeCloseTo(expected[2], 12);
  }
});

test('preserves linear RGB through XYZ round-trip conversion', () => {
  const colors: readonly RgbChannels[] = [
    [0.25, 0.5, 0.75],
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [1.2, -0.1, 0.8],
  ];

  for (const original of colors) {
    const xyz = linearRgbToXyzD65(original);
    const converted = xyzD65ToLinearRgb(xyz);

    expect(converted[0]).toBeCloseTo(original[0], 12);
    expect(converted[1]).toBeCloseTo(original[1], 12);
    expect(converted[2]).toBeCloseTo(original[2], 12);
  }
});

test('does not modify the original XYZ channels', () => {
  const original: XyzD65Channels = [0.25, 0.5, 0.75];

  xyzD65ToLinearRgb(original);

  expect(original).toEqual([0.25, 0.5, 0.75]);
});
