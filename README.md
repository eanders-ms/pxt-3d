# pxt-3d ![Build status badge](https://github.com/eanders-ms/pxt-3d/workflows/MakeCode/badge.svg)


![](./media/demo.gif)

This library implements a perspective 3D renderer for MakeCode Arcade. Practical? No. Fun? Yes!

## Features

- Renders 3D objects from the perspective of a camera.
- Lighting models: None, Flat, Dither. Maybe more will come: greyscale/monochrome, dramatic multi-color dithering, additional dithering patterns, others?
- Primitives: Cube. More possibly coming: Sphere, diamond, cylinder, quad, ...
- Depth buffer (only works in simulator due to device memory constraints -- I'm in search of a solution).
- Frustum clipping (partially implemented).
- Backface culling.
- Fixed point (Fx8) linear algebra and trigonometric functions.

## TODO

- [ ] Improve perspective projection.
- [ ] Find a way to support depth buffer on device -- currently getting an out-of-memory error (panic 22).
- [ ] Proper triangle/view frustom clipping (split triangles when needed).
- [ ] Child objects / object hierarchies.
- [ ] Make a better looking demo scene. Maybe a spaceship flying through a city ala https://youtu.be/XezcZVu66QI?t=485 ?. Requires depth buffer.
- [ ] Experiment with other types of lighting. More creative palettes, greyscale, etc.
- [ ] Find performance problems and try to improve them. Goal: 30 fps when writing color to every pixel, with depth buffer.
- [ ] Or, maybe this is fine as-is, and I'll move on to the next thing :).

## Use this extension

This repository can be added as an **extension** in MakeCode.

* open https://arcade.makecode.com/
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for the URL of this repository and import

## Edit this extension

To edit this repository in MakeCode.

* open https://arcade.makecode.com/
* click on **Import** then click on **Import URL**
* paste the repository URL and click import

## Blocks preview

This image shows the blocks code from the last commit in master.
This image may take a few minutes to refresh.

![A rendered view of the blocks](https://github.com/eanders-ms/pxt-3d/raw/master/.makecode/blocks.png)

## Supported targets

* for PXT/arcade
* for PXT/arcade
(The metadata above is needed for package search.)

