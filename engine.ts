
namespace threed {
    export class Engine {
        private _instances: Instance[];
        private _camera: Camera;
        private _light: Light;
        private _renderer: Renderer;

        public get instances() { return this._instances; }
        public get camera() { return this._camera; }
        public get light() { return this._light; }

        constructor() {
            this._instances = [];
            this._camera = new Camera(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
            this._light = new Light(Vector3.Normalized(new Vector3(1, 1, -1)));
            this._renderer = new Renderer(this);
            this._renderer.backfaceCulling = true;
            this._renderer.depthCheckEnabled = true;
            this._renderer.lightModel = LightModel.Flat;

            image.setPalette(Colors.Palette);
        }

        public step(dt: number) {
            // Handle input
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
