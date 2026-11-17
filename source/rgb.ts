import type { Channels } from './channels.ts';
import type { ColorSpace } from './color.ts';

export type RgbChannels = Channels<
  ColorSpace.Srgb,
  readonly [red: number, green: number, blue: number]
>;

export type LinearRgbChannels = Channels<
  ColorSpace.LinearSrgb,
  readonly [red: number, green: number, blue: number]
>;

const SRGB_TO_LINEAR_THRESHOLD = 0.04045;
const LINEAR_TO_SRGB_THRESHOLD = 0.0031308;

const SRGB_LINEAR_SCALE = 12.92;
const SRGB_OFFSET = 0.055;
const SRGB_SCALE = 1.055;
const SRGB_EXPONENT = 2.4;

export function srgbToLinearChannel(channel: number): number {
  const absoluteChannel = Math.abs(channel);

  if (absoluteChannel <= SRGB_TO_LINEAR_THRESHOLD) {
    return channel / SRGB_LINEAR_SCALE;
  }

  const sign = channel < 0 ? -1 : 1;

  return sign * ((absoluteChannel + SRGB_OFFSET) / SRGB_SCALE) ** SRGB_EXPONENT;
}

export function linearToSrgbChannel(channel: number): number {
  const absoluteChannel = Math.abs(channel);

  if (absoluteChannel <= LINEAR_TO_SRGB_THRESHOLD) {
    return channel * SRGB_LINEAR_SCALE;
  }

  const sign = channel < 0 ? -1 : 1;

  return sign * (SRGB_SCALE * absoluteChannel ** (1 / SRGB_EXPONENT) - SRGB_OFFSET);
}

export function srgbToLinearRgb(channels: RgbChannels): LinearRgbChannels {
  const [red, green, blue] = channels;

  return [srgbToLinearChannel(red), srgbToLinearChannel(green), srgbToLinearChannel(blue)];
}

export function linearRgbToSrgb(channels: LinearRgbChannels): RgbChannels {
  const [red, green, blue] = channels;

  return [linearToSrgbChannel(red), linearToSrgbChannel(green), linearToSrgbChannel(blue)];
}
