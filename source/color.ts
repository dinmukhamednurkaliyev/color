import type { OklabChannels } from './oklab.ts';
import type { OklchChannels } from './oklch.ts';
import type { RgbChannels } from './rgb.ts';
import type { XyzD65Channels } from './xyz-d65.ts';

export const ColorSpace = {
  Srgb: 'srgb',
  LinearSrgb: 'srgb-linear',
  XyzD65: 'xyz-d65',
  Oklab: 'oklab',
  Oklch: 'oklch',
} as const;

export type ColorSpace = (typeof ColorSpace)[keyof typeof ColorSpace];

export type Color =
  | {
      readonly space: typeof ColorSpace.Srgb;
      readonly channels: RgbChannels;
      readonly alpha: number;
    }
  | {
      readonly space: typeof ColorSpace.LinearSrgb;
      readonly channels: RgbChannels;
      readonly alpha: number;
    }
  | {
      readonly space: typeof ColorSpace.XyzD65;
      readonly channels: XyzD65Channels;
      readonly alpha: number;
    }
  | {
      readonly space: typeof ColorSpace.Oklab;
      readonly channels: OklabChannels;
      readonly alpha: number;
    }
  | {
      readonly space: typeof ColorSpace.Oklch;
      readonly channels: OklchChannels;
      readonly alpha: number;
    };
