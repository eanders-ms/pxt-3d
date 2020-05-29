
namespace threed {
    export class Plane {
        public normal: Vector3;
        public distance: Vector3;

        constuctor(normal: Vector3, distance: Vector3) {
            this.normal = normal;
            this.distance = distance;
        }
    }
}