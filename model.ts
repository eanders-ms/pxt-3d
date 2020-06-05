namespace threed {
    export class Model {
        public vertices: Vector3[];
        public triangles: Triangle[];
        public center: Vector3;
        public radius: Fx8;

        constructor(vertices: Vector3[], triangles: Triangle[], center: Vector3, radius: Fx8) {
            this.vertices = vertices;
            this.triangles = triangles;
            this.center = center;
            this.radius = radius;
        }

        public static Cube() {
            const vertices = [
                new Vector3(Fx.oneFx8, Fx.oneFx8, Fx.oneFx8),
                new Vector3(negOneFx8, Fx.oneFx8, Fx.oneFx8),
                new Vector3(negOneFx8, negOneFx8, Fx.oneFx8),
                new Vector3(Fx.oneFx8, negOneFx8, Fx.oneFx8),
                new Vector3(Fx.oneFx8, Fx.oneFx8, negOneFx8),
                new Vector3(negOneFx8, Fx.oneFx8, negOneFx8),
                new Vector3(negOneFx8, negOneFx8, negOneFx8),
                new Vector3(Fx.oneFx8, negOneFx8, negOneFx8),
            ];
            const triangles = [
                new Triangle([0, 1, 2], new Vector3(Fx.zeroFx8, Fx.zeroFx8, Fx.oneFx8)),
                new Triangle([0, 2, 3], new Vector3(Fx.zeroFx8, Fx.zeroFx8, Fx.oneFx8)),
                new Triangle([4, 0, 3], new Vector3(Fx.oneFx8, Fx.zeroFx8, Fx.zeroFx8)),
                new Triangle([4, 3, 7], new Vector3(Fx.oneFx8, Fx.zeroFx8, Fx.zeroFx8)),
                new Triangle([5, 4, 7], new Vector3(Fx.zeroFx8, Fx.zeroFx8, negOneFx8)),
                new Triangle([5, 7, 6], new Vector3(Fx.zeroFx8, Fx.zeroFx8, negOneFx8)),
                new Triangle([1, 5, 6], new Vector3(negOneFx8, Fx.zeroFx8, Fx.zeroFx8)),
                new Triangle([1, 6, 2], new Vector3(negOneFx8, Fx.zeroFx8, Fx.zeroFx8)),
                new Triangle([1, 0, 5], new Vector3(Fx.zeroFx8, Fx.oneFx8, Fx.zeroFx8)),
                new Triangle([5, 0, 4], new Vector3(Fx.zeroFx8, Fx.oneFx8, Fx.zeroFx8)),
                new Triangle([2, 6, 7], new Vector3(Fx.zeroFx8, negOneFx8, Fx.zeroFx8)),
                new Triangle([2, 7, 3], new Vector3(Fx.zeroFx8, negOneFx8, Fx.zeroFx8)),
            ];

            return new Model(vertices, triangles, Vector3.Zero(), Fx8(Math.sqrt(3)));
        }
    }
}