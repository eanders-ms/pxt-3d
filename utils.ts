// Add your code here
namespace util {
    function frustum(left: number, right: number, bottom: number, top: number, znear: number, zfar: number) {
        let X = 2 * znear / (right - left)
        let Y = 2 * znear / (top - bottom)
        let A = (right + left) / (right - left)
        let B = (top + bottom) / (top - bottom)
        let C = (0 - (zfar + znear)) / (zfar - znear)
        let D = -2 * zfar * znear / (zfar - znear)

        return [[X, 0, A, 0],
        [0, Y, B, 0],
        [0, 0, C, D],
        [0, 0, -1, 0]];
    }

    function perspective(fovy: number, aspect: number, znear: number, zfar: number) {
        let ymax = znear * Math.tan(fovy * Math.PI / 360.0);
        let ymin = -ymax;
        let xmin = ymin * aspect;
        let xmax = ymax * aspect;
        
        return frustum(xmin, xmax, ymin, ymax, znear, zfar);
    }
}
