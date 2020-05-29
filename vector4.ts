
namespace threed {
    export class Vector4 {
        public x: number;
        public y: number;
        public z: number;
        public w: number;

        constructor(arg1: number | Vector3 | Vector4, y: number, z: number, w: number) {
            if (arg1 instanceof Vector3) {
                this.x = arg1.x;
                this.y = arg1.y;
                this.z = arg1.z;
                this.w = 1;
            } else if (arg1 instanceof Vector4) {
                this.x = arg1.x;
                this.y = arg1.y;
                this.z = arg1.z;
                this.w = arg1.w;

            } else {
                this.x = arg1;
                this.y = y;
                this.z = z;
                this.w = w;
            }
        }
    }
}