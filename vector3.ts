
namespace threed {
    export class Vector3 {
        public x: Fx8;
        public y: Fx8;
        public z: Fx8;

        constructor(x: Fx8, y: Fx8, z: Fx8) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        public toVector4() {
            return new Vector4(this.x, this.y, this.z, Fx.oneFx8);
        }

        public static Zero() {
            return new Vector3(Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8);
        }

        public static Scale(k: Fx8, vec: Vector3) {
            return new Vector3(Fx.mul(k, vec.x), Fx.mul(k, vec.y), Fx.mul(k, vec.z));
        }

        public static Dot(v1: Vector3, v2: Vector3) {
            return Fx.add(Fx.add(Fx.mul(v1.x, v2.x), Fx.mul(v1.y, v2.y)), Fx.mul(v1.z, v2.z));
        }

        public static Cross(v1: Vector3, v2: Vector3) {
            return new Vector3(
                Fx.sub(Fx.mul(v1.y, v2.z), Fx.mul(v1.z, v2.y)),
                Fx.sub(Fx.mul(v1.z, v2.x), Fx.mul(v1.x, v2.z)),
                Fx.sub(Fx.mul(v1.x, v2.y), Fx.mul(v1.y, v2.x)));
        }

        public static Add(v1: Vector3, v2: Vector3) {
            return new Vector3(Fx.add(v1.x, v2.x), Fx.add(v1.y, v2.y), Fx.add(v1.z, v2.z));
        }

        public static Subtract(v1: Vector3, v2: Vector3) {
            return new Vector3(Fx.sub(v1.x, v2.x), Fx.sub(v1.y, v2.y), Fx.sub(v1.z, v2.z));
        }

        public static Magnitude(vec: Vector3) {
            return Fx(Math.sqrt(Fx.toFloat(Vector3.Dot(vec, vec))));
        }

        public static Normalized(vec: Vector3) {
            const mag = Vector3.Magnitude(vec);
            if (!mag) return vec;
            return Vector3.Scale(Fx.div(Fx.oneFx8, mag), vec);
        }
    }
}