
namespace threed {
    export class Triangle {
        public a: number;
        public b: number;
        public c: number;
        public normal: Vector;

        constructor(a: number, b: number, c: number, normal: Vector) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.normal = normal.dup();
        }
    }
}