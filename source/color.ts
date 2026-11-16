import type { OklabChannels } from './oklab.ts';
import type { OklchChannels } from './oklch.ts';
import type { RgbChannels } from './rgb.ts';
import type { XyzD65Channels } from './xyz-d65.ts';

export enum ColorSpace {
  Srgb = 'srgb',
  LinearSrgb = 'srgb-linear',
  XyzD65 = 'xyz-d65',
  Oklab = 'oklab',
  Oklch = 'oklch',
}

type CoordinatesBySpace = {
  [ColorSpace.Srgb]: RgbChannels;
  [ColorSpace.LinearSrgb]: RgbChannels;
  [ColorSpace.XyzD65]: XyzD65Channels;
  [ColorSpace.Oklab]: OklabChannels;
  [ColorSpace.Oklch]: OklchChannels;
};

export type Color<Space extends ColorSpace = ColorSpace> = {
  [CurrentSpace in Space]: {
    readonly space: CurrentSpace;
    readonly coordinates: CoordinatesBySpace[CurrentSpace];
    readonly alpha: number;
  };
}[Space];
