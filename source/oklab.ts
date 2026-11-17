import type { Channels } from './channels.ts';
import type { ColorSpace } from './color.ts';
import type { XyzD65Channels } from './xyz-d65.ts';

export type OklabChannels = Channels<
  ColorSpace.Oklab,
  readonly [lightness: number, a: number, b: number]
>;

export function xyzD65ToOklab(channels: XyzD65Channels): OklabChannels {
  const [x, y, z] = channels;

  const long = 0.819022437996703 * x + 0.3619062600528904 * y - 0.1288737815209879 * z;

  const medium = 0.0329836539323885 * x + 0.9292868615863434 * y + 0.0361446663506424 * z;

  const short = 0.0481771893596242 * x + 0.2642395317527308 * y + 0.6335478284694309 * z;

  const longRoot = Math.cbrt(long);
  const mediumRoot = Math.cbrt(medium);
  const shortRoot = Math.cbrt(short);

  const lightness =
    0.210454268309314 * longRoot + 0.7936177747023054 * mediumRoot - 0.0040720430116193 * shortRoot;

  const a =
    1.9779985324311684 * longRoot - 2.4285922420485799 * mediumRoot + 0.450593709617411 * shortRoot;

  const b =
    0.0259040424655478 * longRoot +
    0.7827717124575296 * mediumRoot -
    0.8086757549230774 * shortRoot;

  return [lightness, a, b];
}

export function oklabToXyzD65(channels: OklabChannels): XyzD65Channels {
  const [lightness, a, b] = channels;

  const longRoot = lightness + 0.3963377773761749 * a + 0.2158037573099136 * b;

  const mediumRoot = lightness - 0.1055613458156586 * a - 0.0638541728258133 * b;

  const shortRoot = lightness - 0.0894841775298119 * a - 1.2914855480194092 * b;

  const long = longRoot ** 3;
  const medium = mediumRoot ** 3;
  const short = shortRoot ** 3;

  const x = 1.2268798758459243 * long - 0.5578149944602171 * medium + 0.2813910456659647 * short;

  const y = -0.0405757452148008 * long + 1.112286803280317 * medium - 0.0717110580655164 * short;

  const z = -0.0763729366746601 * long - 0.4214933324022432 * medium + 1.5869240198367816 * short;

  return [x, y, z];
}
