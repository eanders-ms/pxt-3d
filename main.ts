controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    engine.camera.rotation.y -= 1;
})
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    engine.camera.position = threed.Vector3.Subtract(engine.camera.position, threed.Vector3.Scale(1, engine.camera.forward));
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    engine.camera.rotation.y += 1;
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    engine.camera.position = threed.Vector3.Subtract(engine.camera.position, threed.Vector3.Scale(1, engine.camera.forward));
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    engine.camera.rotation.y -= 1;
})
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    engine.camera.position = threed.Vector3.Add(engine.camera.position, threed.Vector3.Scale(1, engine.camera.forward));
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    engine.camera.position = threed.Vector3.Add(engine.camera.position, threed.Vector3.Scale(1, engine.camera.forward));
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    engine.camera.rotation.y += 1;
})
controller.setRepeatDefault(0, 10);
const engine = new threed.Engine();
const cube = threed.Model.Cube();
const i0 = new threed.Instance(cube, threed.Colors.Red, new threed.Vector3(0, 0, 10), new threed.Vector3(45, 45, 0), 1);
const i1 = new threed.Instance(cube, threed.Colors.Blue, new threed.Vector3(2.75, 0, 10), new threed.Vector3(0, 0, 0), 1.25);
const i2 = new threed.Instance(cube, threed.Colors.Green, new threed.Vector3(-2.75, 0, 10), new threed.Vector3(0, 0, 0), 1.25);
engine.instances.push(i0)
engine.instances.push(i1)
engine.instances.push(i2)
game.onUpdateInterval(10, function () {
    engine.draw();
i0.rotation.x += 1.76;
i0.rotation.y += 2.33;
i1.rotation.z += 3.37;
i1.rotation.y -= 0.11;
i2.rotation.z -= 2.71;
i2.rotation.y += 1.03;
})
