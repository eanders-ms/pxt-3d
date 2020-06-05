controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    engine.renderer.overWire = !engine.renderer.overWire;
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    engine.renderer.lightModel += 1;
engine.renderer.lightModel %= threed.LightModel.Count;
})
function updateCamera () {
    if (cameraDistance < Fx.zeroFx8) {
        cameraDistance = Fx.zeroFx8;
    }
    engine.camera.orbit(redCube.position, cameraDistance, cameraOrbitAngle, threed.Vector3.Y());
engine.camera.lookAt(redCube.position);
}
const engine = new threed.Engine();
engine.renderer.backfaceCulling = true;
engine.renderer.depthCheckEnabled = true;
engine.renderer.overWire = false;
engine.renderer.lightModel = threed.LightModel.Dither;
const cube = threed.Model.Cube();
const redCube = new threed.Instance(cube, threed.Colors.Red, new threed.Vector3(Fx8(0), Fx8(0), Fx8(0)), threed.Vector3.Zero(), threed.Vector3.One());
const blueCube = new threed.Instance(cube, threed.Colors.Blue, new threed.Vector3(Fx8(2.75), Fx8(0), Fx8(0)), threed.Vector3.Zero(), threed.Vector3.One());
const greenCube = new threed.Instance(cube, threed.Colors.Green, new threed.Vector3(Fx8(-2.75), Fx8(0), Fx8(0)), threed.Vector3.Zero(), threed.Vector3.One());
engine.instances.push(redCube)
engine.instances.push(blueCube)
engine.instances.push(greenCube)
let cameraOrbitAngle = threed.PI_OVER_2_FX8;
let cameraDistance = Fx8(10);
game.onPaint(function () {
    engine.draw();
})
game.onUpdate(function () {
    const dx = Fx8(controller.dx(30));
const dy = Fx8(controller.dy(15));
cameraOrbitAngle = Fx.sub(cameraOrbitAngle, dx);
cameraDistance = Fx.add(cameraDistance, dy);
updateCamera()
    // Note: angles are not in radians OR degrees here!
    // They're in a 256-angle unit circle.
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
