
namespace threed {
    export class Light {
        private _direction: Vector;

        public get direction() { return this._direction; }
        public set direction(v) {
            this._direction = v.normal();
        }
        
        constructor() {
            this.direction = Vector.Y();
        }
    }
}