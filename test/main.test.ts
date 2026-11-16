import { describe, expect, test } from 'bun:test';

import { parseHexColor } from '../source/main.ts';

describe('parseHexColor', () => {
  test('parses a hexadecimal color', () => {
    expect(parseHexColor('#FF8000')).toEqual({
      red: 255,
      green: 128,
      blue: 0,
    });
  });

  test('supports lowercase hexadecimal digits', () => {
    expect(parseHexColor('#aabbcc')).toEqual({
      red: 170,
      green: 187,
      blue: 204,
    });
  });

  test('parses black and white', () => {
    expect(parseHexColor('#000000')).toEqual({
      red: 0,
      green: 0,
      blue: 0,
    });

    expect(parseHexColor('#FFFFFF')).toEqual({
      red: 255,
      green: 255,
      blue: 255,
    });
  });

  test('rejects invalid hexadecimal colors', () => {
    expect(() => parseHexColor('FF8000')).toThrow(RangeError);
    expect(() => parseHexColor('#FFF')).toThrow(RangeError);
    expect(() => parseHexColor('#GG0000')).toThrow(RangeError);
    expect(() => parseHexColor('#12345678')).toThrow(RangeError);
  });
});
