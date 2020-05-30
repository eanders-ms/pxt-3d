
namespace threed {
    export class Engine {
        private _sequence = 0;
        private _models: { [name: string]: Model };
        private _instances: Instance[];
        private _camera: Camera;
        private _light: Light;
        private _renderer: Renderer;

        public get models() { return this._models; }
        public get instances() { return this._instances; }
        public get camera() { return this._camera; }
        public get light() { return this._light; }

        constructor() {
            this._models = {};
            this._instances = [];
            this._camera = new Camera(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
            this._light = new Light(new Vector3(0, 1, 0));
            this._renderer = new Renderer(this);

            image.setPalette(Colors.Palette);
        }

        public step(dt: number) {
            // Update animations
            // Update physics
            // Check kill plane
            // etc
        }

        public draw() {
            this._renderer.render();
        }
    }
}
