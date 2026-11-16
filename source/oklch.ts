import type { OklabChannels } from './oklab.ts';

export type OklchChannels = readonly [lightness: number, chroma: number, hue: number | null];

const POWERLESS_HUE_EPSILON = 0.000004;

export function oklabToOklch(channels: OklabChannels): OklchChannels {
  const [lightness, a, b] = channels;

  const chroma = Math.hypot(a, b);

  if (chroma <= POWERLESS_HUE_EPSILON) {
    return [lightness, 0, null];
  }

  const angle = (Math.atan2(b, a) * 180) / Math.PI;
  const hue = (angle + 360) % 360;

  return [lightness, chroma, hue];
}

export function oklchToOklab(channels: OklchChannels): OklabChannels {
  const [lightness, chroma, hue] = channels;

  if (hue === null) {
    return [lightness, 0, 0];
  }

  const radians = (hue * Math.PI) / 180;

  const a = chroma * Math.cos(radians);
  const b = chroma * Math.sin(radians);

  return [lightness, a, b];
}
