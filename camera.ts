
namespace threed {
    export class Camera {
        private _transform: Matrix4x4;
        private _clippingPlanes: Plane[];
        private _transposedOrientation: Matrix4x4;
        private _forward: Vector3;

        public get transform() { return this._transform; }
        public get clippingPlanes() { return this._clippingPlanes; }
        public get transposedOrientation() { return this._transposedOrientation; }

        public position: Vector3;
        public orientation: Matrix4x4;

        constructor(position: Vector3, rotation: Vector3) {
            this.orientation = Matrix4x4.Identity();
            this.position = Vector3.Zero();
            // Hacky. Todo: Use a real projection matrix
            const s2 = Fx8(Math.SQRT2);
            const ns2 = Fx8(-Math.SQRT2);
            this._clippingPlanes = [
                new Plane(new Vector3(Fx.zeroFx8, Fx.zeroFx8, Fx.oneFx8), negOneFx8), // Near
                new Plane(new Vector3(s2, Fx.zeroFx8, s2), Fx.zeroFx8), // Left
                new Plane(new Vector3(ns2, Fx.zeroFx8, s2), Fx.zeroFx8), // Right
                new Plane(new Vector3(Fx.zeroFx8, ns2, s2), Fx.zeroFx8), // Top
                new Plane(new Vector3(Fx.zeroFx8, s2, s2), Fx.zeroFx8), // Bottom
            ];
            this.update();
        }

        public update() {
            const orientation = this.orientation;
            const translation = Matrix4x4.TranslationMatrix(Vector3.Scale(negOneFx8, this.position));
            this._transposedOrientation = Matrix4x4.Transposed(orientation);
            this._transform = Matrix4x4.Multiply(this._transposedOrientation, translation);
            //this._forward = Matrix4x4.MultiplyVector4(orientation, new Vector3(Fx.zeroFx8, Fx.zeroFx8, Fx.oneFx8).toVector4()).toVector3();
        }

        public orbit(pt: Vector3, dist: Fx8, angle: Fx8, normal: Vector3) {
            // Assuming here that [0, 0, 1] represents a zero-degree rotation around axis [0, 1, 0].
            const rotation = Matrix4x4.RotationMatrixFromAxisAngle(normal, angle);
            const rotated = Matrix4x4.MultiplyVector4(rotation, Vector3.Scale(dist, Vector3.X()).toVector4()).toVector3();
            this.position = Vector3.Add(rotated, pt);
        }

        public lookAt(pt: Vector3) {
            const forward = Vector3.Normalized(Vector3.Subtract(pt, this.position));
            const right = Vector3.Cross(Vector3.Y(), forward);
            const up = Vector3.Cross(forward, right);
            this.orientation = Matrix4x4.RotationMatrixFromAxisVectors(forward, right, up);
        }

        public rotate(angle: Fx8, axis: Vector3) {
            this.orientation = Matrix4x4.RotationMatrixFromAxisAngle(axis, angle);
        }
    }
}