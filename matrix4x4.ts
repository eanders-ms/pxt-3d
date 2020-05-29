namespace threed {
    export class Matrix4x4 {
        public data: number[][];

        constructor(data: number[][]) {
            this.data = data;
        }

        public static MakeIdentity() {
            return new Matrix4x4([
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]]);
        }

        public static MakeRotationMatrix(angles: Vector3) {

        }

        public static MakeTranslationMatrix(translation: Vector3) {
            return new Matrix4x4([
                [1, 0, 0, translation.x],
                [0, 1, 0, translation.y],
                [0, 0, 1, translation.z],
                [0, 0, 0, 1]]);
        }

        public static MakeScalingMatrix(scale: number) {
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

        public static MultiplyMatrix(matA: Matrix4x4, matB: Matrix4x4) {
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

        public MakeTransposed(mat: Matrix4x4) {
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