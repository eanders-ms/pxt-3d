const engine = new threed.Engine();
const cubeModel = threed.Model.Cube(threed.Colors.Red);
const cubeInst = new threed.Instance(cubeModel, new threed.Vector3(0, 0, -10), new threed.Vector3(45, 45, 0), 1);
engine.instances.push(cubeInst);
game.onUpdateInterval(10, function () {
    engine.draw();
})
