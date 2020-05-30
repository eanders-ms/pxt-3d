controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    engine.camera.position.z -= 1;
})
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    engine.camera.position.z += 1;
})
const engine = new threed.Engine();
const redCubeModel = threed.Model.Cube(threed.Colors.Red);
const blueSphereModel = threed.Model.Sphere(5, threed.Colors.Blue);
const redCubeInst0 = new threed.Instance(redCubeModel, new threed.Vector3(0, 0, 10), new threed.Vector3(45, 45, 0), 1);
const blueSphereInst0 = new threed.Instance(blueSphereModel, new threed.Vector3(2, 0, 10), new threed.Vector3(0, 0, 0), 1.5);
engine.instances.push(redCubeInst0)
engine.instances.push(blueSphereInst0)
game.onUpdateInterval(10, function () {
    engine.draw();
    redCubeInst0.rotation.x += 1.76;
    redCubeInst0.rotation.y += 2.33;
    blueSphereInst0.rotation.z += 3.37;
    blueSphereInst0.rotation.y -= 0.11;
})
