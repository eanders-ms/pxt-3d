const engine = new threed.Engine();
const redCubeModel = threed.Model.Cube(threed.Colors.Red);
const blueSphereModel = threed.Model.Sphere(5, threed.Colors.Blue);
const greenDiamondModel = threed.Model.Sphere(3, threed.Colors.Green);
const i0 = new threed.Instance(redCubeModel, new threed.Vector3(0, 0, 10), new threed.Vector3(45, 45, 0), 1);
const i1 = new threed.Instance(blueSphereModel, new threed.Vector3(2.75, 0, 10), new threed.Vector3(0, 0, 0), 1.5);
const i2 = new threed.Instance(greenDiamondModel, new threed.Vector3(-2.75, 0, 10), new threed.Vector3(0, 0, 0), 1.5);
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
