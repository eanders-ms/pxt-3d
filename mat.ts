// Add your code here

class Matrix {
    private rows: Vector[];

    public static Create(rows: Vector[]): Matrix {
        return new Matrix().setRows(rows);
    }

    public static Identity(): Matrix {
        return Matrix.Create([
            Vector.Create([1, 0, 0, 0]),
            Vector.Create([0, 1, 0, 0]),
            Vector.Create([0, 0, 1, 0]),
            Vector.Create([0, 0, 0, 1]),
        ]);
    }

    public static Zero(): Matrix {
        return Matrix.Create([
            Vector.Zero(4),
            Vector.Zero(4),
            Vector.Zero(4),
            Vector.Zero(4),
        ]);        
    }

    public setRows(rows: Vector[]): this {
        rows = (rows || []).slice(0, 4);
        while (rows.length < 4) {
            rows.push(Vector.Zero(4));
        }
        for (let i = 0; i < rows.length; ++i) {
            if (rows[i].dimension() < 4) {
                rows[i] = Vector.Zero(4);
            } 
        }
        this.rows = [];
        rows.forEach(function (value: Vector, index: number) {
           this.rows.push(value.dup()); 
        });
        return this;
    }

    public dup(): Matrix {
        return Matrix.Create(this.rows);
    }

    public e(row: number, col: number): number {
        if (row >= 0 && row < 4) {
            return this.rows[row].e(col);
        }
        return undefined;
    }

    public row(i: number): Vector {
        if (i >= 0 && i < 4) {
            return this.rows[i];
        }
        return undefined;
    }

    public col(j: number): Vector {
        if (j >= 0 && j < 4) {
            return Vector.Create([
                this.row(0).e(j),
                this.row(1).e(j),
                this.row(2).e(j),
                this.row(3).e(j),
            ])
        }
        return undefined;
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
            const v = rows[row] = Vector.Zero(4);
            for (let col = 0; col < this.rows[0].dimension(); ++col) {
                v.setElement()
            }
        }
    }
}