import { ColorSpace, createColor } from './color.ts';
import type { Color } from './color.ts';
import { srgbToLinearRgb } from './rgb.ts';

export function convertColor(
  color: Color<ColorSpace.Srgb>,
  target: ColorSpace.LinearSrgb,
): Color<ColorSpace.LinearSrgb> {
  if (color.space !== ColorSpace.Srgb || target !== ColorSpace.LinearSrgb) {
    throw new RangeError('Unsupported color conversion.');
  }

  return createColor(target, srgbToLinearRgb(color.coordinates), color.alpha);
}
