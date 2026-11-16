export type RgbChannels = readonly [red: number, green: number, blue: number];

export type XyzD65Channels = readonly [x: number, y: number, z: number];

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

export function linearRgbToXyzD65(channels: RgbChannels): XyzD65Channels {
  const [red, green, blue] = channels;

  const x = 0.4123907992659595 * red + 0.357584339383878 * green + 0.1804807884018343 * blue;

  const y = 0.21263900587151036 * red + 0.7151686787677559 * green + 0.07219231536073371 * blue;

  const z = 0.01933081871559185 * red + 0.119194779794626 * green + 0.9505321522496606 * blue;

  return [x, y, z];
}

export function xyzD65ToLinearRgb(channels: XyzD65Channels): RgbChannels {
  const [x, y, z] = channels;

  const red = 3.2409699419045213 * x - 1.5373831775700935 * y - 0.4986107602930033 * z;

  const green = -0.9692436362808798 * x + 1.8759675015077206 * y + 0.04155505740717561 * z;

  const blue = 0.0556300796969936 * x - 0.20397695888897657 * y + 1.0569715142428786 * z;

  return [red, green, blue];
}
