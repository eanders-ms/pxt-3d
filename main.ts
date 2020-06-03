controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    engine.renderer.overWire = !engine.renderer.overWire;
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    engine.renderer.lightModel += 1;
engine.renderer.lightModel %= threed.LightModel.Count;
})
const engine = new threed.Engine();
const cube = threed.Model.Cube();
const redCube = new threed.Instance(cube, threed.Colors.Red, new threed.Vector3(Fx8(0), Fx8(0), Fx8(10)), new threed.Vector3(Fx8(0), Fx8(0), Fx8(0)), 1);
const blueCube = new threed.Instance(cube, threed.Colors.Blue, new threed.Vector3(Fx8(2.75), Fx8(0), Fx8(10)), new threed.Vector3(Fx8(0), Fx8(0), Fx8(0)), 1.25);
const greenCube = new threed.Instance(cube, threed.Colors.Green, new threed.Vector3(Fx8(-2.75), Fx8(0), Fx8(10)), new threed.Vector3(Fx8(0), Fx8(0), Fx8(0)), 1.25);
engine.instances.push(redCube)
engine.instances.push(blueCube)
engine.instances.push(greenCube)
game.onPaint(function () {
    engine.draw();
})
game.onUpdate(function () {
    const dx = Fx8(controller.dx(25));
const dy = Fx8(controller.dy(15));
engine.camera.rotation.y = Fx.add(engine.camera.rotation.y, dx);
engine.camera.position = threed.Vector3.Add(engine.camera.position, threed.Vector3.Scale(dy, engine.camera.forward));
redCube.rotation.x = Fx.add(redCube.rotation.x, Fx8(1.76));
redCube.rotation.y = Fx.add(redCube.rotation.y, Fx8(2.33));
redCube.rotation.z = Fx.sub(redCube.rotation.z, Fx8(0.03));
blueCube.rotation.z = Fx.add(blueCube.rotation.z, Fx8(3.37));
blueCube.rotation.y = Fx.sub(blueCube.rotation.y, Fx8(0.11));
greenCube.rotation.z = Fx.sub(greenCube.rotation.z, Fx8(2.71));
greenCube.rotation.y = Fx.add(greenCube.rotation.y, Fx8(1.03));
engine.step();
})
