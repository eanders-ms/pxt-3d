
namespace threed {
    export class Transform {
        private _position: Vector;
        private _rotation: Quaternion;
        private _scale: Vector;

        public get position() { return this._position; }
        public get rotation() { return this._rotation; }
        public get scale() { return this._scale; }

        constructor() {
            this._position = Vector.Zero(3);
            this._rotation = Quaternion.Identity();
            this._scale = Vector.One(3);
        }
    }
}
