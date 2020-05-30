namespace threed {
    export class Instance {
        public model: Model;
        public color: number;
        public position: Vector3;
        public rotation: Vector3;
        public scale: number;
        public transform: Matrix4x4;

        constructor(model: Model, color: number, position: Vector3, rotation: Vector3, scale: number) {
            this.model = model;
            this.color = color;
            this.position = position;
            this.rotation = rotation;
            this.scale = scale;

            this.updateTransform();
        }

        public updateTransform() {
            this.rotation.x = this.rotation.x % 360;
            this.rotation.y = this.rotation.y % 360;
            this.rotation.z = this.rotation.z % 360;
            this.transform = Matrix4x4.Multiply(
                Matrix4x4.TranslationMatrix(this.position),
                Matrix4x4.Multiply(
                    Matrix4x4.RotationMatrixFromEulerAngles(this.rotation),
                    Matrix4x4.ScalingMatrix(this.scale)));
        }
    }
}