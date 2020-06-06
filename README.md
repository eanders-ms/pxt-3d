# pxt-3d ![Build status badge](https://github.com/eanders-ms/pxt-3d/workflows/MakeCode/badge.svg)


![](./media/demo.gif)

## TODO

- [ ] Improve perspective projection.
- [ ] Find a way to support depth buffer on device -- currently get out-of-memory error (panic 22).
- [ ] Proper triangle/view frustom clipping (split triangles when needed).
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

