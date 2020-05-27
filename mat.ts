
class Matrix {
    private rows: Vector[];

    public static Create(rows: Vector[]): Matrix {
        return new Matrix().setRows(rows);
    }

    public static Identity(dim = 4): Matrix {
        dim = dim >= 0 ? dim : 0;
        const rows: Vector[] = [];
        for (let i = 0; i < dim; ++i) {
            const row = Vector.Zero(dim);
            row.setElement(1, i);
            rows.push(row);
        }
        return Matrix.Create(rows);
    }

    public static Zero(dim = 4): Matrix {
        dim = dim >= 0 ? dim : 0;
        const rows: Vector[] = [];
        for (let i = 0; i < dim; ++i) {
            const row = Vector.Zero(dim);
            rows.push(row);
        }
        return Matrix.Create(rows);
    }

    public static Frustum(left: number, right: number, bottom: number, top: number, znear: number, zfar: number): Matrix {
        let X = 2 * znear / (right - left);
        let Y = 2 * znear / (top - bottom);
        let A = (right + left) / (right - left);
        let B = (top + bottom) / (top - bottom);
        let C = (0 - (zfar + znear)) / (zfar - znear);
        let D = -2 * zfar * znear / (zfar - znear);

        return Matrix.Create([
            Vector.Create([X, 0, A, 0]),
            Vector.Create([0, Y, B, 0]),
            Vector.Create([0, 0, C, D]),
            Vector.Create([0, 0, -1, 0])
        ]);
    }

    public static Perspective(fovy: number, aspect: number, znear: number, zfar: number): Matrix {
        let ymax = znear * Math.tan(fovy * Math.PI / 180.0);
        let ymin = -ymax;
        let xmin = ymin * aspect;
        let xmax = ymax * aspect;
        return Matrix.Frustum(xmin, xmax, ymin, ymax, znear, zfar);
    }

    public static Rotation(theta: number, axis: Vector): Matrix {
        if (axis.dimension() < 3) return undefined;
        axis = axis.normal();
        if (!axis) return undefined;
        theta = theta * Math.PI / 180.0;
        const x = axis.e(0), y = axis.e(1), z = axis.e(2);
        const s = Math.sin(theta);
        const c = Math.cos(theta);
        const t = 1 - c;
        // Based on: https://www.gamedev.net/reference/articles/article1199.asp
        return Matrix.Create([
            Vector.Create([t * x * x + c, t * x * y - s * z, t * x * z + s * y, 0]),
            Vector.Create([t * x * y + s * z, t * y * y + c, t * y * z - s * x, 0]),
            Vector.Create([t * x * z - s * y, t * y * z + s * x, t * z * z + c, 0]),
            Vector.Create([0, 0, 0, 1]),
        ]);
    }

    public static Translation(offset: Vector, dim = 4): Matrix {
        if (offset.dimension() < 3 && dim !== 4) return undefined;
        const m = Matrix.Identity(dim);
        m.row(0).setElement(offset.e(0), dim - 1);
        m.row(1).setElement(offset.e(1), dim - 1);
        m.row(2).setElement(offset.e(2), dim - 1);
        return m;
    }

    public static Diagonal(v: Vector): Matrix {
        const dim = v.dimension();
        const m = Matrix.Zero(dim);
        for (let i = 0; i < dim; ++i) {
            m.set(v.e(i), i, i);
        }
        return m;
    }

    public setRows(rows: Vector[]): this {
        this.rows = [];
        rows.forEach((v) => this.rows.push(v.dup()));
        return this;
    }

    public dup(): Matrix {
        return Matrix.Create(this.rows);
    }

    public e(row: number, col: number): number {
        if (row >= 0 && row < this.rows.length) {
            return this.rows[row].e(col);
        }
        return undefined;
    }

    public set(v: number, row: number, col: number) {
        if (row >= 0 && row < this.rows.length) {
            this.rows[row].setElement(v, col);
        }
    }

    public row(i: number): Vector {
        if (i >= 0 && i < this.rows.length) {
            return this.rows[i];
        }
        return undefined;
    }

    public col(j: number): Vector {
        const els: number[] = [];
        for (let i = 0; i < this.rows.length; ++i) {
            els.push(this.rows[i].e(j));
        }
        return Vector.Create(els);
    }

    public n(): number {
        return this.rows.length;
    }

    public m(): number {
        return this.rows[0].dimension();
    }

    public dimensions(): { n: number; m: number } {
        return {
            n: this.n(),
            m: this.m()
        };
    }

    public map(fn: (x: number, i: number, j: number) => number): Matrix {
        const rows: Vector[] = [];
        for (let row = 0; row < this.rows.length; ++row) {
            rows.push(this.rows[row].map((x, i) => fn(x, 0, i)));
        }
        return Matrix.Create(rows);
    }

    public add(other: Matrix | number): Matrix {
        if (typeof other === 'number') {
            return this.map((x, i, j) => x + other);
        }
        return this.map((x, i, j) => x + other.e(i, j));
    }

    public subtract(other: Matrix | number): Matrix {
        if (typeof other === 'number') {
            return this.map((x, i, j) => x - other);
        }
        return this.map((x, i, j) => x - other.e(i, j));
    }

    public multiply(other: Matrix | number): Matrix {
        if (typeof other === 'number') {
            return this.map((x, i, j) => x * other);
        }
        const rows: Vector[] = [];
        for (let row = 0; row < this.rows.length; ++row) {
            const v = this.rows[row].map((x, i) => x * other.e(row, i));
            rows.push(v);
        }
        return Matrix.Create(rows);
    }

    public isSquare(): boolean {
        return this.n() === this.m();
    }
}

class MatrixStack {
    private stack: Matrix[] = [];
    private matrix = Matrix.Identity(4);

    constructor() {
    }

    public push(m: Matrix) {
        if (m) {
            this.stack.push(m.dup());
            this.matrix = m.dup();
        } else {
            this.stack.push(this.matrix.dup());
        }
    }

    public pop() {
        if (this.stack.length === 0) return undefined;
        this.matrix = this.stack.pop();
        return this.matrix;
    }

    public multiply(m: Matrix) {
        this.matrix = this.matrix.multiply(m);
    }

    public translate(v: Vector) {
        const m = Matrix.Translation(v);
        this.multiply(m);
    }

    public rotate(theta: number, axis: Vector) {
        theta = theta * Math.PI / 180.0;
        const m = Matrix.Rotation(theta, axis);
        this.multiply(m);
    }

    public scale(v: Vector) {
        if (!this.matrix.isSquare()) return;
        if (v.dimension() !== this.matrix.n()) return;
        const m = Matrix.Diagonal(v);
        this.multiply(m);
    }

    public loadIdentity() {
        this.matrix = Matrix.Identity(4);
    }
}