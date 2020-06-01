namespace threed {
    const DegToRad = Math.PI / 180.0;

    export class Matrix4x4 {
        public data: Fx8[][];


        constructor(data: Fx8[][]) {
            this.data = data;
        }

        public static FromNumbers(data: number[][]) {
            return new Matrix4x4([
                [Fx(data[0][0]), Fx(data[0][1]), Fx(data[0][2]), Fx(data[0][3])],
                [Fx(data[1][0]), Fx(data[1][1]), Fx(data[1][2]), Fx(data[1][3])],
                [Fx(data[2][0]), Fx(data[2][1]), Fx(data[2][2]), Fx(data[2][3])],
                [Fx(data[3][0]), Fx(data[3][1]), Fx(data[3][2]), Fx(data[3][3])],
            ]);
        }

        public static Identity() {
            return new Matrix4x4([
                [Fx.oneFx8, Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8],
                [Fx.zeroFx8, Fx.oneFx8, Fx.zeroFx8, Fx.zeroFx8],
                [Fx.zeroFx8, Fx.zeroFx8, Fx.oneFx8, Fx.zeroFx8],
                [Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8, Fx.oneFx8]]);
        }

        public static Zero() {
            return new Matrix4x4([
                [Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8],
                [Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8],
                [Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8],
                [Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8]]);
        }

        public static RotationMatrixFromEulerAngles(angles: Vector3) {
            const A = Fx.toFloat(angles.x) * DegToRad;
            const B = Fx.toFloat(angles.y) * DegToRad;
            const Y = Fx.toFloat(angles.z) * DegToRad;

            const sA = Math.sin(A);
            const cA = Math.cos(A);
            const sB = Math.sin(B);
            const cB = Math.cos(B);
            const sY = Math.sin(Y);
            const cY = Math.cos(Y);

            return Matrix4x4.FromNumbers([
                [cA * cB, cA * sB * sY - sA * cY, cA * sB * cY + sA * sY, 0],
                [sA * cB, sA * sB * sY + cA * cY, sA * sB * cY - cA * sY, 0],
                [-sB, cB * sY, cB * cY, 0],
                [0, 0, 0, 1]
            ]);
        }

        public static RotationMatrixFromAxisAngle(axis: Vector3, angle: number) {
            const O = angle * DegToRad;
            const s = Math.sin(O);
            const c = Math.cos(O);
            const x = Fx.toFloat(axis.x);
            const y = Fx.toFloat(axis.y);
            const z = Fx.toFloat(axis.z);

            return Matrix4x4.FromNumbers([
                [c + x * x * (1 - c), x * y * (1 - c) - x * s, x * z * (1 - c) + y * s, 0],
                [y * x * (1 - c) + x * s, c + y * y * (1 - c), y * z * (1 - c) - x * s, 0],
                [z * x * (1 - c) - y * s, z * y * (1 - c) + x * s, c + z * z * (1 - c), 0],
                [0, 0, 0, 1]
            ]);
        }

        public static TranslationMatrix(translation: Vector3) {
            return new Matrix4x4([
                [Fx.oneFx8, Fx.zeroFx8, Fx.zeroFx8, translation.x],
                [Fx.zeroFx8, Fx.oneFx8, Fx.zeroFx8, translation.y],
                [Fx.zeroFx8, Fx.zeroFx8, Fx.oneFx8, translation.z],
                [Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8, Fx.oneFx8]]);
        }

        public static ScalingMatrix(scale: number) {
            const s = Fx(scale);
            return new Matrix4x4([
                [s, Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8],
                [Fx.zeroFx8, s, Fx.zeroFx8, Fx.zeroFx8],
                [Fx.zeroFx8, Fx.zeroFx8, s, Fx.zeroFx8],
                [Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8, Fx.oneFx8]]);
        }

        public static MultiplyVector4(mat: Matrix4x4, vec4: Vector4) {
            const result = [Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8];
            const vec = [vec4.x, vec4.y, vec4.z, vec4.w];

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    result[i] = Fx.add(result[i], Fx.mul(mat.data[i][j], vec[j]));
                }
            }

            return new Vector4(result[0], result[1], result[2], result[3]);
        }

        public static Multiply(matA: Matrix4x4, matB: Matrix4x4) {
            const result = Matrix4x4.Zero();

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    for (let k = 0; k < 4; k++) {
                        result.data[i][j] = Fx.add(result.data[i][j], Fx.mul(matA.data[i][k], matB.data[k][j]));
                    }
                }
            }

            return result;
        }

        public static Transposed(mat: Matrix4x4) {
            const result = Matrix4x4.Zero();

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    result.data[i][j] = mat.data[j][i];
                }
            }

            return result;
        }
    }
} 