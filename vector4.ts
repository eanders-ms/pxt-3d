
namespace threed {
    export class Vector4 {
        public x: number;
        public y: number;
        public z: number;
        public w: number;

        constructor(arg1: any, y: number = null, z: number = null, w: number = null) {
            if (typeof arg1 === 'number') {
                this.x = arg1;
                this.y = y;
                this.z = z;
                this.w = w;
            } else {
                if (arg1['x'] !== undefined) {
                    this.x = arg1.x;
                    this.y = arg1.y;
                    this.z = arg1.z;
                    this.w = 1;
                }
                if (arg1['w'] !== undefined) {
                    this.w = arg1.w;
                }
            }
        }
    }
}