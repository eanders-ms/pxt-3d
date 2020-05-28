namespace threed {
    export class Actor {
        private _transform: Transform;
        private _mesh: Mesh;

        public get transform() { return this._transform; }

        constructor() {
            this._transform = new Transform();
        }
    }
}
