// Add your code here

class Vector {
    public els: number[];
    public get x() { return this.els[0]; }
    public set x(v) { this.els[0] = v; }
    public get y() { return this.els[1]; }
    public set y(v) { this.els[1] = v; }
    public get z() { return this.els[2]; }
    public set z(v) { this.els[2] = v; }

    public static Create(els: number[]): Vector {
        return new Vector().setElements(els);
    }

    public setElements(els: number[]): this {
        this.els = (els || [0, 0, 0]).slice();
        this.els.length = 3;
        return this;
    }

    public map(fn: (x: number, i: number) => number) {
        const els: number[] = [];
        this.each((x, i) => {
            els.push(fn(x, i));
        });
        return Vector.Create(els);
    }

    public each(fn: (x: number, i: number) => void) {
        for (let i = 0; i < 3; ++i) {
            fn(this.els[i], i);
        }
    }

    public add(rhs: Vector): Vector {
        return this.map((x, i) => x + rhs.els[i]);
    }

    public subtract(rhs: Vector): Vector {
        return this.map((x, i) => x - rhs.els[i]);
    }

    public multiply(rhs: Vector): Vector {
        return this.map((x, i) => x * rhs.els[i]);
    }

    public dot(rhs: Vector): number {
        return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z;
    }

    public cross(rhs: Vector): Vector {
        return Vector.Create(
            [this.y * rhs.z - this.z * rhs.y,
            this.z * rhs.x - this.x * rhs.z,
            this.x * rhs.y - this.y * rhs.x]
        );
    }
}