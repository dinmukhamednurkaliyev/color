import type { Channels } from './channels.ts';
import type { ColorSpace } from './color.ts';
import type { OklabChannels } from './oklab.ts';

export type OklchChannels = Channels<
  ColorSpace.Oklch,
  readonly [lightness: number, chroma: number, hue: number | null]
>;

const POWERLESS_HUE_EPSILON = 0.000004;
const FULL_CIRCLE_DEGREES = 360;
const DEGREES_PER_RADIAN = 180 / Math.PI;

export function oklabToOklch(channels: OklabChannels): OklchChannels {
  const [lightness, a, b] = channels;

  const chroma = Math.hypot(a, b);

  if (chroma <= POWERLESS_HUE_EPSILON) {
    return [lightness, 0, null];
  }

  const angle = Math.atan2(b, a) * DEGREES_PER_RADIAN;
  const hue = (angle + FULL_CIRCLE_DEGREES) % FULL_CIRCLE_DEGREES;

  return [lightness, chroma, hue];
}

export function oklchToOklab(channels: OklchChannels): OklabChannels {
  const [lightness, chroma, hue] = channels;

  if (hue === null) {
    return [lightness, 0, 0];
  }

  const radians = hue / DEGREES_PER_RADIAN;

  const a = chroma * Math.cos(radians);
  const b = chroma * Math.sin(radians);

  return [lightness, a, b];
}
