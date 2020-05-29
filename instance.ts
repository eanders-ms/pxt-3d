namespace threed {
    export class Instance {
        public model: Model;
        public position: Vector3;
        public rotation: Vector3;
        public scale: number;
        public transform: Matrix4x4;

        constructor(model: Model, position: Vector3, rotation: Vector3, scale: number) {
            this.model = model;
            this.position = position;
            this.rotation = rotation;
            this.scale = scale;

            this.updateTransform();
        }

        public updateTransform() {
            this.transform;
        }
    }
}