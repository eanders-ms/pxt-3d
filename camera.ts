
namespace threed {
    export class Camera {
        public position: Vector3;
        public rotation: Vector3;
        public clippingPlanes: Plane[];
        public transform: Matrix4x4;
        public transposedOrientation: Matrix4x4;

        constructor(position: Vector3, rotation: Vector3) {
            this.position = position;
            this.rotation = rotation;
            const s2 = Math.sqrt(2);
            this.clippingPlanes = [
                new Plane(new Vector3(0, 0, 1), -1), // Near
                new Plane(new Vector3(s2, 0, s2), 0), // Left
                new Plane(new Vector3(-s2, 0, s2), 0), // Right
                new Plane(new Vector3(0, -s2, s2), 0), // Top
                new Plane(new Vector3(0, s2, s2), 0), // Bottom
            ];

            this.updateTransform();
        }

        public updateTransform() {
            this.transposedOrientation = Matrix4x4.Transposed(Matrix4x4.RotationMatrixFromEulerAngles(this.rotation));
            this.transform = Matrix4x4.Multiply(
                this.transposedOrientation,
                Matrix4x4.TranslationMatrix(Vector3.Multiply(-1, this.position)));
        }
    }
}