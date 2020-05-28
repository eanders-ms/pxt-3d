
namespace threed {
    export class Mesh {
        public vertices: Vector[];
        public triangles: Triangle[];
        public color: number;

        constructor() {
            this.vertices = [];
            this.triangles = [];
            this.color = Colors.Random();
        }

        public static CreateBox(): Mesh {
            const box = new Mesh();
            box.vertices.push(Vector.Create([1, -1, 1]));
            box.vertices.push(Vector.Create([1, -1, -1]));
            box.vertices.push(Vector.Create([1, 1, -1]));
            box.vertices.push(Vector.Create([1, 1, 1]));
            box.vertices.push(Vector.Create([-1, -1, 1]));
            box.vertices.push(Vector.Create([-1, -1, -1]));
            box.vertices.push(Vector.Create([-1, 1, -1]));
            box.vertices.push(Vector.Create([-1, 1, 1]));
            box.triangles.push(box.makeTriangle(4, 0, 3));
            box.triangles.push(box.makeTriangle(4, 3, 7));
            box.triangles.push(box.makeTriangle(0, 1, 2));
            box.triangles.push(box.makeTriangle(0, 2, 3));
            box.triangles.push(box.makeTriangle(1, 5, 6));
            box.triangles.push(box.makeTriangle(1, 6, 2));
            box.triangles.push(box.makeTriangle(5, 4, 7));
            box.triangles.push(box.makeTriangle(5, 7, 6));
            box.triangles.push(box.makeTriangle(7, 3, 2));
            box.triangles.push(box.makeTriangle(7, 2, 6));
            box.triangles.push(box.makeTriangle(0, 5, 1));
            box.triangles.push(box.makeTriangle(0, 4, 5));
            return box;
        }

        private makeTriangle(a: number, b: number, c: number): Triangle {
            const ab = this.vertices[b].add(this.vertices[a].multiply(-1));
            const ac = this.vertices[c].add(this.vertices[a].multiply(-1));
            const normal = ab.cross3(ac);            
            return new Triangle(a, b, c, normal);
        }
    }
}
