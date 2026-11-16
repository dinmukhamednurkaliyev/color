export type RgbChannels = readonly [red: number, green: number, blue: number];

export function srgbToLinearChannel(channel: number): number {
  const absoluteChannel = Math.abs(channel);

  if (absoluteChannel <= 0.04045) {
    return channel / 12.92;
  }

  const sign = channel < 0 ? -1 : 1;

  return sign * ((absoluteChannel + 0.055) / 1.055) ** 2.4;
}

export function linearToSrgbChannel(channel: number): number {
  const absoluteChannel = Math.abs(channel);

  if (absoluteChannel <= 0.0031308) {
    return channel * 12.92;
  }

  const sign = channel < 0 ? -1 : 1;

  return sign * (1.055 * absoluteChannel ** (1 / 2.4) - 0.055);
}

export function srgbToLinearRgb(channels: RgbChannels): RgbChannels {
  const [red, green, blue] = channels;

  return [srgbToLinearChannel(red), srgbToLinearChannel(green), srgbToLinearChannel(blue)];
}

export function linearRgbToSrgb(channels: RgbChannels): RgbChannels {
  const [red, green, blue] = channels;

  return [linearToSrgbChannel(red), linearToSrgbChannel(green), linearToSrgbChannel(blue)];
}
