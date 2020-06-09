
namespace threed {
    export class Engine {
        private _instances: Instance[];
        private _camera: Camera;
        private _light: Light;
        private _renderer: IRenderer;

        //% callInDebugger
        public get instances() { return this._instances; }
        //% callInDebugger
        public get camera() { return this._camera; }
        //% callInDebugger
        public get light() { return this._light; }
        //% callInDebugger
        public get renderer() { return this._renderer; }

        constructor() {
            this._instances = [];
            this._camera = new Camera();
            this._light = new Light(Vector3.Normalized(new Vector3(Fx.oneFx8, Fx.oneFx8, Fx8(-1))));
            this._renderer = new Renderer0(this);

            image.setPalette(Colors.Palette);
        }

        public step() {
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
