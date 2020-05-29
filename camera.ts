
namespace threed {
    export class Camera {
        private _position: Vector;
        private _rotation: Quaternion;

        public get position() { return this._position; }
        public get rotation() { return this._rotation; }
    }
}