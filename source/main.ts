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
