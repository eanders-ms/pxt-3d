
namespace threed {
    export class Triangle {
        public indices: number[];
        public normal: Vector3;
        public color: number;

        constructor(indices: number[], normal: Vector3, color: number) {
            this.indices = indices;
            this.normal = normal;
            this.color = color;
        }
    }
}