
namespace threed {
    export class Triangle {
        public a: number;
        public b: number;
        public c: number;
        public normal: Vector3;
        public color: number;

        constructor(a: number, b: number, c: number, normal: Vector3, color: number) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.normal = normal;
            this.color = color;
        }
    }
}