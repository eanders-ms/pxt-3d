namespace threed {
    export class Matrix4x4 {
        public data: number[][];


        constructor(data: number[][]) {
            this.data = data;
        }

        public static Identity() {
            return new Matrix4x4([
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]]);
        }

        public static RotationMatrixFromEulerAngles(angles: Vector3) {
            const A = angles.x * Math.PI / 180.0;
            const B = angles.y * Math.PI / 180.0;
            const Y = angles.z * Math.PI / 180.0;

            const sA = Math.sin(A);
            const cA = Math.cos(A);
            const sB = Math.sin(B);
            const cB = Math.cos(B);
            const sY = Math.sin(Y);
            const cY = Math.cos(Y);

            return new Matrix4x4([
                [cA * cB, cA * sB * sY - sA * cY, cA * sB * cY + sA * sY, 0],
                [sA * cB, sA * sB * sY + cA * cY, sA * sB * cY - cA * sY, 0],
                [-sB, cB * sY, cB * cY, 0],
                [0, 0, 0, 1]
            ]);
        }

        public static RotationMatrixFromAxisAngle(axis: Vector3, angle: number) {
            const O = angle * Math.PI / 180.0;
            const s = Math.sin(O);
            const c = Math.cos(O);
            const x = axis.x;
            const y = axis.y;
            const z = axis.z;

            return new Matrix4x4([
                [c + x * x * (1 - c), x * y * (1 - c) - x * s, x * z * (1 - c) + y * s, 0],
                [y * x * (1 - c) + x * s, c + y * y * (1 - c), y * z * (1 - c) - x * s, 0],
                [z * x * (1 - c) - y * s, z * y * (1 - c) + x * s, c + z * z * (1 - c), 0],
                [0, 0, 0, 1]
            ]);
        }

        public static TranslationMatrix(translation: Vector3) {
            return new Matrix4x4([
                [1, 0, 0, translation.x],
                [0, 1, 0, translation.y],
                [0, 0, 1, translation.z],
                [0, 0, 0, 1]]);
        }

        public static ScalingMatrix(scale: number) {
            return new Matrix4x4([
                [scale, 0, 0, 0],
                [0, scale, 0, 0],
                [0, 0, scale, 0],
                [0, 0, 0, 1]]);
        }

        public static MultiplyVector4(mat: Matrix4x4, vec4: Vector4) {
            const result = [0, 0, 0, 0];
            const vec = [vec4.x, vec4.y, vec4.z, vec4.w];

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    result[i] += mat.data[i][j] * vec[j];
                }
            }

            return new Vector4(result[0], result[1], result[2], result[3]);
        }

        public static Multiply(matA: Matrix4x4, matB: Matrix4x4) {
            const result = new Matrix4x4([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    for (let k = 0; k < 4; k++) {
                        result.data[i][j] += matA.data[i][k] * matB.data[k][j];
                    }
                }
            }

            return result;
        }

        public static Transposed(mat: Matrix4x4) {
            const result = new Matrix4x4([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    result.data[i][j] = mat.data[j][i];
                }
            }

            return result;
        }
    }
} 