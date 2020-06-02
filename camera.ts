
namespace threed {
    export class Camera {
        public position: Vector3;
        public rotation: Vector3;
        public clippingPlanes: Plane[];
        public transform: Matrix4x4;
        public transposedOrientation: Matrix4x4;

        private _forward: Vector3;
        public get forward() { return this._forward; }

        constructor(position: Vector3, rotation: Vector3) {
            this.position = position;
            this.rotation = rotation;
            const s2 = Fx8(Math.SQRT2);
            const ns2 = Fx8(-Math.SQRT2);
            this.clippingPlanes = [
                new Plane(new Vector3(Fx.zeroFx8, Fx.zeroFx8, Fx.oneFx8), Fx8(-1)), // Near
                new Plane(new Vector3(s2, Fx.zeroFx8, s2), Fx.zeroFx8), // Left
                new Plane(new Vector3(ns2, Fx.zeroFx8, s2), Fx.zeroFx8), // Right
                new Plane(new Vector3(Fx.zeroFx8, ns2, s2), Fx.zeroFx8), // Top
                new Plane(new Vector3(Fx.zeroFx8, s2, s2), Fx.zeroFx8), // Bottom
            ];

            this.updateTransform();
        }

        public updateTransform() {
            //this.rotation.x = this.rotation.x % 360;
            //this.rotation.y = this.rotation.y % 360;
            //this.rotation.z = this.rotation.z % 360;
            const orientation = Matrix4x4.RotationMatrixFromEulerAngles(this.rotation);
            this.transposedOrientation = Matrix4x4.Transposed(orientation);
            this.transform = Matrix4x4.Multiply(
                this.transposedOrientation,
                Matrix4x4.TranslationMatrix(Vector3.Scale(Fx8(-1), this.position)));
            this._forward = Matrix4x4.MultiplyVector4(orientation, new Vector4(Fx.zeroFx8, Fx.zeroFx8, Fx.oneFx8, Fx.oneFx8)).toVector3();
        }
    }
}