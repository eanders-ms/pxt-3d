
namespace threed {
    export class Vector4 {
        public x: Fx8;
        public y: Fx8;
        public z: Fx8;
        public w: Fx8;

        constructor(x: Fx8, y: Fx8, z: Fx8, w: Fx8) {
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