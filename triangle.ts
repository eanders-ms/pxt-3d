
namespace threed {
    export class Triangle {
        public indices: number[];
        public normal: Vector3;

        constructor(indices: number[], normal: Vector3) {
            this.indices = indices;
            this.normal = normal;
        }
    }
}