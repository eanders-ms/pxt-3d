namespace threed {
    export class Matrix4x4 {
        public data: Fx8[][];

        constructor(data: Fx8[][]) {
            this.data = data;
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
            const A = angles.x;
            const B = angles.y;
            const Y = angles.z;

            const sA = fxsin(A);
            const cA = fxcos(A);
            const sB = fxsin(B);
            const cB = fxcos(B);
            const sY = fxsin(Y);
            const cY = fxcos(Y);

            return new Matrix4x4([
                [Fx.mul(cA, cB), Fx.sub(Fx.mul(Fx.mul(cA, sB), sY), Fx.mul(sA, cY)), Fx.add(Fx.mul(Fx.mul(cA, sB), cY), Fx.mul(sA, sY)), Fx.zeroFx8],
                [Fx.mul(sA, cB), Fx.add(Fx.mul(Fx.mul(sA, sB), sY), Fx.mul(cA, cY)), Fx.sub(Fx.mul(Fx.mul(sA, sB), cY), Fx.mul(cA, sY)), Fx.zeroFx8],
                [Fx.neg(sB), Fx.mul(cB, sY), Fx.mul(cB, cY), Fx.zeroFx8],
                [Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8, Fx.oneFx8]
            ]);
        }

        public static RotationMatrixFromAxisAngle(axis: Vector3, angle: Fx8) {
            const O = angle;
            const s = fxsin(O);
            const c = fxcos(O);
            const nc = Fx.sub(Fx.oneFx8, c);
            const x = axis.x;
            const y = axis.y;
            const z = axis.z;

            return new Matrix4x4([
                [Fx.add(c, Fx.mul(Fx.mul(x, x), nc)), Fx.sub(Fx.mul(Fx.mul(x, y), nc), Fx.mul(x, s)), Fx.add(Fx.mul(Fx.mul(x, z), nc), Fx.mul(y, s)), Fx.zeroFx8],
                [Fx.add(Fx.mul(Fx.mul(y, x), nc), Fx.mul(x, s)), Fx.add(c, Fx.mul(Fx.mul(y, y), nc)), Fx.sub(Fx.mul(Fx.mul(y, z), nc), Fx.mul(x, s)), Fx.zeroFx8],
                [Fx.sub(Fx.mul(Fx.mul(z, x), nc), Fx.mul(y, s)), Fx.add(Fx.mul(Fx.mul(z, y), nc), Fx.mul(x, s)), Fx.add(c, Fx.mul(Fx.mul(z, z), nc)), Fx.zeroFx8],
                [Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8, Fx.oneFx8]
            ]);
        }

        // Note: Axes should be orthogonal and normalized.
        public static RotationMatrixFromAxisVectors(forward: Vector3, right: Vector3, up: Vector3) {
            return new Matrix4x4([
                [right.x, up.x, forward.x, Fx.zeroFx8],
                [right.y, up.y, forward.y, Fx.zeroFx8],
                [right.z, up.z, forward.z, Fx.zeroFx8],
                [Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8, Fx.oneFx8]
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
            const s = Fx8(scale);
            return new Matrix4x4([
                [s, Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8],
                [Fx.zeroFx8, s, Fx.zeroFx8, Fx.zeroFx8],
                [Fx.zeroFx8, Fx.zeroFx8, s, Fx.zeroFx8],
                [Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8, Fx.oneFx8]]);
        }

        public static NonUniformScalingMatrix(scale: Vector3) {
            return new Matrix4x4([
                [scale.x, Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8],
                [Fx.zeroFx8, scale.y, Fx.zeroFx8, Fx.zeroFx8],
                [Fx.zeroFx8, Fx.zeroFx8, scale.z, Fx.zeroFx8],
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