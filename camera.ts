
namespace threed {
    export class Camera {
        public position: Vector3;
        public rotation: Vector3;

        constructor(position: Vector3, rotation: Vector3) {
            this.position = position;
            this.rotation = rotation;
        }
    }
}