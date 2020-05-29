
namespace threed {
    export class Engine {
        private _actors: Actor[];
        private _light: Light;
        private _renderer: Renderer;

        public get actors() { return this._actors; }
        public get light() { return this._light; }

        public initialize() {
            this._actors = [];
            this._light = new Light();
            this._renderer = new Renderer(this);
            image.setPalette(Colors.Palette);
        }

        public step(dt: number) {
            // Update animations
            // Update physics
            // Check kill plane
        }

        public draw() {
            this._renderer.render();
        }
    }
}
