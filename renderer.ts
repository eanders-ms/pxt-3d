 
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

        private writeDepth(x: number, y: number, inv_z: number) {
            x = this.image.width / 2 + (x | 0);
            y = this.image.height / 2 - (y | 0) - 1;

            if (x < 0 || x >= this.image.width || y < 0 || y >= this.image.height) {
                return false;
            }

            const offset = x + this.image.width * y;
            if (this.depth[offset] === undefined || this.depth[offset] < inv_z) {
                this.depth[offset] = inv_z;
                return true;
            }
            return false;
        }
    }
}
