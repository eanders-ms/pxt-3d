namespace threed {
    export class Model {
        public vertices: Vector3[];
        public triangles: Triangle[];
        public center: Vector3;
        public radius: number;

        constructor(vertices: Vector3[], triangles: Triangle[], center: Vector3, radius: number) {
            this.vertices = vertices;
            this.triangles = triangles;
            this.center = center;
            this.radius = radius;
        }

        public static Cube(color: number) {
            const vertices = [
                new Vector3(1, 1, 1),
                new Vector3(-1, 1, 1),
                new Vector3(-1, -1, 1),
                new Vector3(1, -1, 1),
                new Vector3(1, 1, -1),
                new Vector3(-1, 1, -1),
                new Vector3(-1, -1, -1),
                new Vector3(1, -1, -1),
            ];
            const triangles = [
                new Triangle(0, 1, 2, new Vector3(0, 0, 1), color),
                new Triangle(0, 2, 3, new Vector3(0, 0, 1), color),
                new Triangle(4, 0, 3, new Vector3(1, 0, 0), color),
                new Triangle(4, 3, 7, new Vector3(1, 0, 0), color),
                new Triangle(5, 4, 7, new Vector3(0, 0, -1), color),
                new Triangle(5, 7, 6, new Vector3(0, 0, -1), color),
                new Triangle(1, 5, 6, new Vector3(-1, 0, 0), color),
                new Triangle(1, 6, 2, new Vector3(-1, 0, 0), color),
                new Triangle(1, 0, 5, new Vector3(0, 1, 0), color),
                new Triangle(5, 0, 4, new Vector3(0, 1, 0), color),
                new Triangle(2, 6, 7, new Vector3(0, -1, 0), color),
                new Triangle(2, 7, 3, new Vector3(0, -1, 0), color),
            ];

            return new Model(vertices, triangles, new Vector3(0, 0, 0), Math.sqrt(3));
        }

        public static Sphere(divs: number, color: number) {
            const vertices = [];
            const triangles = [];

            const delta_angle = 2.0 * Math.PI / divs;

            for (let d = 0; d < divs + 1; d++) {
                let y = (2.0 / divs) * (d - divs / 2);
                let radius = Math.sqrt(1.0 - y * y);
                for (let i = 0; i < divs; i++) {
                    const vertex = new Vector3(radius * Math.cos(i * delta_angle), y, radius * Math.sin(i * delta_angle));
                    vertices.push(vertex);
                }
            }

            for (let d = 0; d < divs; d++) {
                for (let i = 0; i < divs - 1; i++) {
                    const i0 = d * divs + i;
                    const normal = new Vector3(
                        (vertices[i0].x + vertices[i0 + divs + 1].x + vertices[i0 + 1].x) / 3,
                        (vertices[i0].y + vertices[i0 + divs + 1].y + vertices[i0 + 1].y) / 3,
                        (vertices[i0].z + vertices[i0 + divs + 1].z + vertices[i0 + 1].z) / 3,
                    );
                    triangles.push(new Triangle(i0, i0 + divs + 1, i0 + 1, normal, color));
                    triangles.push(new Triangle(i0, i0 + divs, i0 + divs + 1, normal, color));
                }
            }

            return new Model(vertices, triangles, new Vector3(0, 0, 0), 1.0);            
        }
    }
}