controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    engine.renderer.overWire = !engine.renderer.overWire;
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    engine.renderer.lightModel += 1;
    engine.renderer.lightModel %= threed.LightModel.Count;
})
const engine = new threed.Engine();
engine.renderer.backfaceCulling = true;
engine.renderer.depthCheckEnabled = true;
engine.renderer.overWire = false;
engine.renderer.lightModel = threed.LightModel.Dither;

const cube = threed.Model.Cube();
const redCube = new threed.Instance(cube, threed.Colors.Red, new threed.Vector3(Fx8(0), Fx8(0), Fx8(10)), new threed.Vector3(Fx8(0), Fx8(0), Fx8(0)), threed.Vector3.One());
const blueCube = new threed.Instance(cube, threed.Colors.Blue, new threed.Vector3(Fx8(2.75), Fx8(0), Fx8(10)), new threed.Vector3(Fx8(0), Fx8(0), Fx8(0)), threed.Vector3.One());
const greenCube = new threed.Instance(cube, threed.Colors.Green, new threed.Vector3(Fx8(-2.75), Fx8(0), Fx8(10)), new threed.Vector3(Fx8(0), Fx8(0), Fx8(0)), threed.Vector3.One());
engine.instances.push(redCube)
engine.instances.push(blueCube)
engine.instances.push(greenCube)
game.onPaint(function () {
    engine.draw();
})
game.onUpdate(function () {
    const dx = Fx8(controller.dx(25));
    const dy = Fx.neg(Fx8(controller.dy(15)));
    engine.camera.rotation.y = Fx.add(engine.camera.rotation.y, dx);
    engine.camera.position = threed.Vector3.Add(engine.camera.position, threed.Vector3.Scale(dy, engine.camera.forward));
    // Note: angles are not in radians OR degrees here! They're in a 256-step unit circle.
    redCube.rotation.x = Fx.add(redCube.rotation.x, Fx8(0.76));
    redCube.rotation.y = Fx.add(redCube.rotation.y, Fx8(0.33));
    redCube.rotation.z = Fx.sub(redCube.rotation.z, Fx8(0.01));
    blueCube.rotation.z = Fx.add(blueCube.rotation.z, Fx8(2.37));
    blueCube.rotation.y = Fx.sub(blueCube.rotation.y, Fx8(0.41));
    blueCube.rotation.z = Fx.sub(blueCube.rotation.z, Fx8(0.01));
    greenCube.rotation.x = Fx.sub(greenCube.rotation.x, Fx8(1.71));
    greenCube.rotation.y = Fx.add(greenCube.rotation.y, Fx8(0.03));
    greenCube.rotation.z = Fx.sub(greenCube.rotation.z, Fx8(0.01));
    engine.step();
})
