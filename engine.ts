
namespace threed {
    export class Engine {
        private _sequence = 0;
        private _actors: { [id: number]: Actor };
        private _camera: Camera;
        private _light: Light;
        private _screen: Image;
        private _renderer: Renderer;

        public get actors() { return this._actors; }
        public get camera() { return this._camera; }
        public get light() { return this._light; }
        public get screen() { return this._screen; }

        constructor() {
            this._actors = {};
            this._camera = new Camera();
            this._light = new Light();
            this._screen = image.create(160, 120);
            scene.setBackgroundImage(this._screen);
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

        public add(actor: Actor) {
            this.remove(actor);
            let id = ++this._sequence;
            while (!id) id = ++this._sequence;
            actor.id = id;
            this._actors[actor.id] = actor;
        }

        public remove(actor: Actor | number) {
            if (typeof actor === 'number')
                delete this._actors[actor];
            else
                delete this._actors[actor.id];
        }
    }
}
