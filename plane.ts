
namespace threed {
    export class Plane {
        public normal: Vector3;
        public direction: Fx8;

        constructor(normal: Vector3, direction: Fx8) {
            this.normal = normal;
            this.direction = direction;
        }
    }
}