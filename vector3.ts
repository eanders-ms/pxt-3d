
namespace threed {
    export class Vector3 {
        public x: number;
        public y: number;
        public z: number;

        constructor(x: number, y: number, z: number) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        public toVector4() {
            return new Vector4(this.x, this.y, this.z, 1);
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