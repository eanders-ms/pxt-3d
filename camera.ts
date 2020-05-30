
namespace threed {
    export class Camera {
        public position: Vector3;
        public rotation: Vector3;
        public clippingPlanes: Plane[];
        public transform: Matrix4x4;

        constructor(position: Vector3, rotation: Vector3) {
            this.position = position;
            this.rotation = rotation;
            this.clippingPlanes = [];

            this.updateTransform();
        }

        public updateTransform() {
            this.transform = Matrix4x4.MultiplyMatrix(
                Matrix4x4.TranslationMatrix(this.position),
                Matrix4x4.RotationMatrixFromEulerAngles(this.rotation));
        }
    }
}