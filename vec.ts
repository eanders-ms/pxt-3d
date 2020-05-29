
namespace threed {
    export class Vector {
        private els: number[];

        constructor(els: number | number[] = null) {
            if (els !== null)
                this.setElements(els);
        }

        public static Create(els: number | number[]): Vector {
            return new Vector(els);
        }

        public static Zero(n = 4): Vector {
            n = n >= 0 ? n : 0;
            const els: number[] = [];
            els.length = n;
            return new Vector().setElements(els);
        }

        public static One(n = 4): Vector {
            n = n >= 0 ? n : 0;
            const els: number[] = [];
            for (let i = 0; i < n; ++i) els.push(1);
            return new Vector().setElements(els);
        }

        public static X() { return Vector.Create([1, 0, 0]); }
        public static Y() { return Vector.Create([0, 1, 0]); }
        public static Z() { return Vector.Create([0, 0, 1]); }

        public setElements(els: number | number[]): this {
            if (typeof els === 'number') {
                this.els = [];
                this.els.length = els;
            } else {
                this.els = (els || []).slice();
            }
            return this;
        }

        public setElement(x: number, i: number): this {
            this.els[i] = x;
            return this;
        }

        public dimension(): number {
            return this.els.length;
        }

        public dup(): Vector {
            return Vector.Create(this.els);
        }

        public e(i: number): number | undefined {
            if (i >= 0 && i < this.els.length) return this.els[i];
            return undefined;
        }

        public map(fn: (x: number, i: number) => number) {
            const els: number[] = [];
            this.each((x, i) => els.push(fn(x, i)));
            return Vector.Create(els);
        }

        public each(fn: (x: number, i: number) => void) {
            for (let i = 0; i < this.els.length; ++i) {
                fn(this.els[i], i);
            }
        }

        public add(rhs: Vector): Vector {
            return this.map((x, i) => x + rhs.els[i]);
        }

        public subtract(rhs: Vector): Vector {
            return this.map((x, i) => x - rhs.els[i]);
        }

        public multiply(rhs: Vector | number): Vector {
            if (typeof rhs === 'number')
                return this.map(((x) => x * rhs));
            return this.map((x, i) => x * rhs.els[i]);
        }

        public dot(rhs: Vector): number {
            const len = Math.min(this.els.length, rhs.els.length);
            let product = 0;
            for (let i = 0; i < len; ++i) {
                product += this.els[i] * rhs.els[i];
            }
            return product;
        }

        public cross3(rhs: Vector): Vector {
            if (this.els.length < 3 || rhs.els.length < 3) return undefined;
            return Vector.Create([
                this.e(1) * rhs.e(2) - this.e(2) * rhs.e(1),
                this.e(2) * rhs.e(0) - this.e(0) * rhs.e(2),
                this.e(0) * rhs.e(1) - this.e(1) * rhs.e(0),
            ]);
        }

        public lengthSq(): number {
            return this.dot(this);
        }

        public length(): number {
            return Math.sqrt(this.lengthSq());
        }

        public normal(): Vector {
            const len = this.length();
            if (!len) return undefined;
            return this.map((x) => x / len);
        }
    }
}