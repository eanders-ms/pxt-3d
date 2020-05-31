
namespace threed {
    export class Vector3 {
        public x: number;
        public y: number;
        public z: number;

        constructor(arg1: any, y: number = null, z: number = null) {
            if (typeof arg1 === 'number') {
                this.x = arg1;
                this.y = y;
                this.z = z;
            } else {
                this.x = arg1.x;
                this.y = arg1.y;
                this.z = arg1.z;
            }
        }

        public static Scale(k: number, vec: Vector3) {
            return new Vector3(k * vec.x, k * vec.y, k * vec.z);
        }

        public static Dot(v1: Vector3, v2: Vector3) {
            return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
        }

        public static Cross(v1: Vector3, v2: Vector3) {
            return new Vector3(
                v1.y * v2.z - v1.z * v2.y,
                v1.z * v2.x - v1.x * v2.z,
                v1.x * v2.y - v1.y * v2.x);
        }

        public static Add(v1: Vector3, v2: Vector3) {
            return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
        }

        public static Subtract(v1: Vector3, v2: Vector3) {
            return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
        }

        public static Magnitude(vec: Vector3) {
            return Math.sqrt(Vector3.Dot(vec, vec));
        }

        public static Normalized(vec: Vector3) {
            const mag = Vector3.Magnitude(vec);
            if (!mag) return vec;
            return Vector3.Scale(1 / mag, vec);
        }
    }
}