
namespace threed {
    export class Vector4 {
        public x: number;
        public y: number;
        public z: number;
        public w: number;

        constructor(x: number, y: number, z: number, w: number) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;

        }

        public toVector3() {
            return new Vector3(this.x, this.y, this.z);
        }
    }
}