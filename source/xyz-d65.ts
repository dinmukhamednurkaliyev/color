import type { Channels } from './channels.ts';
import type { ColorSpace } from './color.ts';
import type { LinearRgbChannels } from './rgb.ts';

export type XyzD65Channels = Channels<
  ColorSpace.XyzD65,
  readonly [x: number, y: number, z: number]
>;

export function linearRgbToXyzD65(channels: LinearRgbChannels): XyzD65Channels {
  const [red, green, blue] = channels;

  const x = 0.4123907992659595 * red + 0.357584339383878 * green + 0.1804807884018343 * blue;

  const y = 0.21263900587151036 * red + 0.7151686787677559 * green + 0.07219231536073371 * blue;

  const z = 0.01933081871559185 * red + 0.119194779794626 * green + 0.9505321522496606 * blue;

  return [x, y, z];
}

export function xyzD65ToLinearRgb(channels: XyzD65Channels): LinearRgbChannels {
  const [x, y, z] = channels;

  const red = 3.2409699419045213 * x - 1.5373831775700935 * y - 0.4986107602930033 * z;

  const green = -0.9692436362808798 * x + 1.8759675015077206 * y + 0.04155505740717561 * z;

  const blue = 0.0556300796969936 * x - 0.20397695888897657 * y + 1.0569715142428786 * z;

  return [red, green, blue];
}
