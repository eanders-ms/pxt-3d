// Add your code here

function glFrustum(left: number, right: number, bottom: number, top: number, znear: number, zfar: number) {
    let D = 0
    let C = 0
    let B = 0
    let A = 0
    let Y = 0
    let X = 0
    X = 2 * znear / (right - left)
    Y = 2 * znear / (top - bottom)
    A = (right + left) / (right - left)
    B = (top + bottom) / (top - bottom)
    C = (0 - (zfar + znear)) / (zfar - znear)
    D = -2 * zfar * znear / (zfar - znear)

    return [[X, 0, A, 0],
    [0, Y, B, 0],
    [0, 0, C, D],
    [0, 0, -1, 0]];
}
