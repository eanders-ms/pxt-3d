namespace threed {
    export class Instance {
        public model: Model;
        public color: number;
        public position: Vector3;
        public rotation: Vector3;
        public scale: Vector3;
        public transform: Matrix4x4;

        constructor(model: Model, color: number, position: Vector3, rotation: Vector3, scale: Vector3) {
            this.model = model;
            this.color = color;
            this.position = position;
            this.rotation = rotation;
            this.scale = scale;

            this.updateTransform();
        }

        public updateTransform() {
            this.transform = Matrix4x4.Multiply(
                Matrix4x4.TranslationMatrix(this.position),
                Matrix4x4.Multiply(
                    Matrix4x4.RotationMatrixFromEulerAngles(this.rotation),
                    Matrix4x4.NonUniformScalingMatrix(this.scale)));
        }
    }
}