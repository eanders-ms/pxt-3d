
namespace threed {
    export class Triangle {
        public a: Vector;
        public b: Vector;
        public c: Vector;
        /*
        public computeNormal() {
            const ab = b.add(a.multiply(-1));
            const ac = c.add(a.multiply(-1));
            this.normal = ab.cross3(ac);
        }
        */
    }
}