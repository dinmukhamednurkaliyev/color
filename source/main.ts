export interface RgbColor {
  readonly red: number;
  readonly green: number;
  readonly blue: number;
}

export function parseHexColor(value: string): RgbColor {
  if (!/^#[0-9a-f]{6}$/i.test(value)) {
    throw new RangeError('Expected a six-digit hexadecimal color.');
  }

  return {
    red: Number.parseInt(value.slice(1, 3), 16),
    green: Number.parseInt(value.slice(3, 5), 16),
    blue: Number.parseInt(value.slice(5, 7), 16),
  };
}
