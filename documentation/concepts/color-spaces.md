# Color Spaces

This document introduces the color spaces currently supported by
the `color` engine and explains how they relate to one another.

## sRGB

sRGB is a widely used RGB color space for displaying colors in
web applications, images, and graphical interfaces.

A color is represented using three coordinates:

- Red
- Green
- Blue

The library uses normalized coordinates rather than 8-bit integers.

For example:

| Color | Coordinates       |
| ----- | ----------------- |
| Black | `[0, 0, 0]`       |
| White | `[1, 1, 1]`       |
| Red   | `[1, 0, 0]`       |
| Gray  | `[0.5, 0.5, 0.5]` |

sRGB uses nonlinear channel encoding.

Consequently, its encoded values are not directly proportional to
physical light intensity.

## Linear-Light sRGB

Linear-light sRGB uses the same RGB primaries and D65 white point
as sRGB, but its coordinates are proportional to light intensity.

The conversion from encoded sRGB to linear-light sRGB removes the
nonlinear transfer function.

For example:

| Encoded sRGB | Linear-light sRGB          |
| ------------ | -------------------------- |
| `0.0`        | `0.0`                      |
| `0.5`        | Approximately `0.21404114` |
| `1.0`        | `1.0`                      |

This conversion is performed independently for each RGB channel.

Linear-light coordinates are necessary for colorimetric conversions
and many calculations involving light.

## CIE XYZ D65

CIE XYZ is a device-independent colorimetric coordinate system.

Its coordinates are:

- X: First tristimulus coordinate.
- Y: Relative luminance coordinate.
- Z: Third tristimulus coordinate.

Unlike RGB, XYZ coordinates do not directly correspond to red,
green, and blue channels.

The current implementation uses the D65 reference white.

For a normalized white color, the approximate XYZ coordinates are:

```text
X = 0.950456
Y = 1.000000
Z = 1.089058
```

These coordinates are relative to the reference white, with Y
normalized to 1.

They do not represent absolute display luminance in nits.

## Color Conversion

The current conversion pipeline is bidirectional:

```text
sRGB
  ↕
Linear-light sRGB
  ↕
CIE XYZ D65
```

Converting between encoded and linear-light sRGB applies a nonlinear
transfer function.

Converting between linear-light sRGB and XYZ D65 uses a linear
matrix transformation.

Both directions are available.

## Numerical Behavior

The conversion functions operate on JavaScript floating-point numbers.

The current implementation follows these principles:

- No implicit rounding of calculated coordinates.
- No automatic clipping to the standard sRGB gamut.
- No mutation of input channel arrays.
- Support for extended negative and positive channel values.

Values outside the standard sRGB gamut can be represented during
intermediate calculations.

The current low-level functions do not perform runtime validation
of finite numbers. Handling invalid numeric inputs will be defined
as the public API evolves.

Alpha channels, gamut mapping, and color appearance models are
not yet implemented.

## Future Color Spaces

The engine is designed to support additional color spaces without
requiring all intermediate calculations to use encoded sRGB.

Planned additions include:

- OKLab and OKLCH for perceptual color operations.
- Display P3 for wide-gamut colors.
- Additional CIE color spaces.
- Explicit gamut checking and gamut mapping.

These capabilities are not part of the current implementation.

## References

- [W3C CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/)
- [W3C Color Conversion Algorithms](https://www.w3.org/TR/css-color-4/#color-conversion-code)
