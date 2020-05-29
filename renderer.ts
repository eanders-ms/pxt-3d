 
namespace threed {
    export class Renderer {
        private image: Image;
        private depth: number[];

        constructor(private engine: Engine) {
            this.image = scene.backgroundImage();
        }

        public render() {
            this.depth = [];
            this.depth.length = this.image.width * this.image.height;
            this.image.fill(Colors.White);
        }
    }
}
