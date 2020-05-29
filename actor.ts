namespace threed {
    export class Actor {
        private _transform: Transform;
        private _mesh: Mesh;

        public get transform() { return this._transform; }

        public get mesh() { return this._mesh; }
        public set mesh(v) { this._mesh = v; }

        constructor() {
            this._transform = new Transform();
        }
    }
}
