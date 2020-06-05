
namespace threed {
    export class Plane {
        public normal: Vector3;
        public offset: Vector3;

        constructor(normal: Vector3, offset: Vector3) {
            this.normal = normal;
            this.offset = offset;
        }
    }
}