
namespace threed {
    export class Transform {
        private _position: Vector;
        private _rotation: Quaternion;
        private _scale: Vector;

        public get position() { return this._position; }
        public get rotation() { return this._rotation; }
        public get scale() { return this._scale; }

        constructor(position: Vector = null, rotation: Quaternion = null, scale: Vector = null) {
            this._position = position ? position.dup() : Vector.Zero(3);
            this._rotation = rotation ? rotation.dup() : Quaternion.Identity();
            this._scale = scale ? scale.dup() : Vector.One(3);
        }
    }
}
