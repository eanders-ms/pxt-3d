
namespace threed {
    export class Renderer {
        static ViewportSize = 1;
        static ProjectionPlaneZ = 1;

        private image: Image;
        private depth: number[];

        constructor(private engine: Engine) {
            this.image = scene.backgroundImage();
        }

        public render() {
            this.depth = [];
            this.depth.length = this.image.width * this.image.height;
            this.image.fill(Colors.Black);
        }

        private writeDepth(x: number, y: number, inv_z: number) {
            x = this.image.width / 2 + (x | 0);
            y = this.image.height / 2 - (y | 0) - 1;

            if (x < 0 || x >= this.image.width || y < 0 || y >= this.image.height) {
                return false;
            }

            const offset = x + this.image.width * y;
            if (this.depth[offset] === undefined || this.depth[offset] < inv_z) {
                this.depth[offset] = inv_z;
                return true;
            }
            return false;
        }

        private putPixel(x: number, y: number, color: number) {
            x = this.image.width / 2 + (x | 0);
            y = this.image.height / 2 - (y | 0) - 1;

            if (x < 0 || x >= this.image.width || y < 0 || y >= this.image.height) {
                return;
            }

            this.image.setPixel(x, y, color);
        }

        private drawLine(p0: Point, p1: Point, color: number) {
            const dx = p1.x - p0.x, dy = p1.y - p0.y;

            if (Math.abs(dx) > Math.abs(dy)) {
                // The line is horizontal-ish. Make sure it's left to right.
                if (dx < 0) { const swap = p0; p0 = p1; p1 = swap; }

                // Compute the Y values and draw.
                const ys = interpolate(p0.x, p0.y, p1.x, p1.y);
                for (let x = p0.x; x <= p1.x; x++) {
                    this.putPixel(x, ys[(x - p0.x) | 0], color);
                }
            } else {
                // The line is verical-ish. Make sure it's bottom to top.
                if (dy < 0) { const swap = p0; p0 = p1; p1 = swap; }

                // Compute the X values and draw.
                const xs = interpolate(p0.y, p0.x, p1.y, p1.x);
                for (let y = p0.y; y <= p1.y; y++) {
                    this.putPixel(xs[(y - p0.y) | 0], y, color);
                }
            }
        }

        private drawWireframeTriangle(p0: Point, p1: Point, p2: Point, color: number) {
            this.drawLine(p0, p1, color);
            this.drawLine(p1, p2, color);
            this.drawLine(p0, p2, color);
        }

        private viewportToImage(p2d: Point) {
            return new Point(
                (p2d.x * this.image.width / Renderer.ViewportSize) | 0,
                (p2d.y * this.image.height / Renderer.ViewportSize) | 0,
                undefined);
        }

        private imageToViewport(p2d: Point) {
            return new Point(
                (p2d.x * Renderer.ViewportSize / this.image.width),
                (p2d.y * Renderer.ViewportSize / this.image.height),
                undefined);
        }

        private projectVertex(v: Vector3) {
            return this.viewportToImage(new Point(
                v.x * Renderer.ProjectionPlaneZ / v.z,
                v.y * Renderer.ProjectionPlaneZ / v.z,
                undefined));
        }
    }

    function interpolate(i0: number, d0: number, i1: number, d1: number) {
        if (i0 == i1) {
            return [d0];
        }

        const values = [];
        const a = (d1 - d0) / (i1 - i0);
        let d = d0;
        for (let i = i0; i <= i1; i++) {
            values.push(d);
            d += a;
        }

        return values;
    }

    function sortedVertexIndices(vertexIndices: number[], projected: Vector3[]) {
        const indices = [0, 1, 2];
        if (projected[vertexIndices[indices[1]]].y < projected[vertexIndices[indices[0]]].y) { const swap = indices[0]; indices[0] = indices[1]; indices[1] = swap; }
        if (projected[vertexIndices[indices[2]]].y < projected[vertexIndices[indices[0]]].y) { const swap = indices[0]; indices[0] = indices[2]; indices[2] = swap; }
        if (projected[vertexIndices[indices[2]]].y < projected[vertexIndices[indices[1]]].y) { const swap = indices[1]; indices[1] = indices[2]; indices[2] = swap; }
        return indices;
    }

    function computeTriangleNormal(v0: Vector3, v1: Vector3, v2: Vector3) {
        const v0v1 = Vector3.Add(v1, Vector3.Multiply(-1, v0));
        const v0v2 = Vector3.Add(v2, Vector3.Multiply(-1, v0));
        return Vector3.Cross(v0v1, v0v2);
    }

    function edgeInterpolate(y0: number, v0: number, y1: number, v1: number, y2: number, v2: number) {
        const v01 = interpolate(y0, v0, y1, v1);
        const v12 = interpolate(y1, v1, y2, v2);
        const v02 = interpolate(y0, v0, y2, v2);
        v01.pop();
        const v012 = v01.concat(v12);
        return [v02, v012];
    }
}
