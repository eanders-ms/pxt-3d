
namespace threed {
    export class Plane {
        public normal: Vector3;
        public direction: number;

        constructor(normal: Vector3, direction: number) {
            this.normal = normal;
            this.direction = direction;
        }
    }
}