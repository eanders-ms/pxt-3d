let engine = new threed.Engine();
let cube = new threed.Actor();
cube.mesh = threed.Mesh.CreateBox();
engine.add(cube);
game.onUpdateInterval(10, function () {
    engine.draw();
})
