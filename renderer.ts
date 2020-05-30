const backfaceCulling = true;
const depthChecksEnabled = true;
const overWire = true;

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
            this.renderScene();
        }

        private renderScene() {
            this.engine.camera.updateTransform();
            for (const instance of this.engine.instances) {
                instance.updateTransform();
                const clipped = this.transformAndClip(instance);
                if (clipped) {
                    this.renderModel(clipped);
                }
            }
        }

        private transformAndClip(instance: Instance) {
            const center = Matrix4x4.MultiplyVector4(instance.transform, new Vector4(instance.model.center));
            const radius2 = instance.model.radius * instance.model.radius;
            for (const plane of this.engine.camera.clippingPlanes) {
                const distance2 = Vector3.Dot(plane.normal, center) + plane.direction;
                if (distance2 < -radius2) {
                    return null;
                }
            }

            const vertices = [];
            for (const vertex of instance.model.vertices) {
                vertices.push(Matrix4x4.MultiplyVector4(instance.transform, new Vector4(vertex)));
            }

            let triangles = instance.model.triangles.slice();
            for (const plane of this.engine.camera.clippingPlanes) {
                const newTriangles: Triangle[] = [];
                for (const triangle of triangles) {
                    clipTriangle(triangle, plane, newTriangles, vertices);
                }
                triangles = newTriangles;
            }
            return new Model(vertices, triangles, center, instance.model.radius);
        }

        private renderModel(model: Model) {
            const projected: Point[] = [];
            for (const vertex of model.vertices) {
                projected.push(this.projectVertex(new Vector4(vertex)));
            }
            for (const triangle of model.triangles) {
                this.renderTriangle(triangle, model.vertices, projected);
            }
        }

        private renderTriangle(triangle: Triangle, vertices: Vector3[], projected: Point[]) {
            // Sort by projected point Y.
            const ti = [triangle.a, triangle.b, triangle.c];
            const sorted = sortedVertexIndices(ti, projected);
            const [i0, i1, i2] = sorted;

            const v0 = vertices[ti[i0]];
            const v1 = vertices[ti[i1]];
            const v2 = vertices[ti[i2]];

            // Compute triangle normal. Use the unsorted vertices, otherwise the winding of the points may change.
            const normal = computeTriangleNormal(vertices[ti[0]], vertices[ti[1]], vertices[ti[2]]);

            // Backface culling.
            if (backfaceCulling) {
                const center = Vector3.Multiply(-1.0 / 3.0, Vector3.Add(Vector3.Add(vertices[ti[0]], vertices[ti[1]]), vertices[ti[2]]));
                if (Vector3.Dot(center, normal) < 0) {
                    return;
                }
            }

            // Get attribute values (X, 1/Z) at the vertices.
            const p0 = projected[ti[i0]];
            const p1 = projected[ti[i1]];
            const p2 = projected[ti[i2]];

            // Compute attribute values at the edges.
            const [x02, x012] = edgeInterpolate(p0.y, p0.x, p1.y, p1.x, p2.y, p2.x);
            const [iz02, iz012] = edgeInterpolate(p0.y, 1.0 / v0.z, p1.y, 1.0 / v1.z, p2.y, 1.0 / v2.z);


            let x_left, x_right;
            let iz_left, iz_right;
            // Determine which is left and which is right.
            const m = (x02.length / 2) | 0;
            if (x02[m] < x012[m]) {
                [x_left, x_right] = [x02, x012];
                [iz_left, iz_right] = [iz02, iz012];
            } else {
                [x_left, x_right] = [x012, x02];
                [iz_left, iz_right] = [iz012, iz02];
            }

            const rotatedLight = Matrix4x4.MultiplyVector4(this.engine.camera.transposedOrientation, new Vector4(this.engine.light.direction));
            const cosAngle = Vector3.Dot(rotatedLight, normal);
            let color = triangle.color;
            if (cosAngle < 0) {
                color = Colors.Shaded(color);
            }

            // Draw horizontal segments.
            for (let y = p0.y; y <= p2.y; y++) {
                const [xl, xr] = [x_left[y - p0.y] | 0, x_right[y - p0.y] | 0];

                // Interpolate attributes for this scanline.
                const [zl, zr] = [iz_left[y - p0.y], iz_right[y - p0.y]];
                const zscan = interpolate(xl, zl, xr, zr);

                for (let x = xl; x <= xr; x++) {
                    if (!depthChecksEnabled ||
                        this.writeDepth(x, y, zscan[x - xl])) {
                        this.putPixel(x, y, triangle.color);
                    }
                }
            }
            if (overWire) {
                this.drawLine(p0, p1, Colors.Black);
                this.drawLine(p0, p2, Colors.Black);
                this.drawLine(p2, p1, Colors.Black);
            }
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

    function interpolate(i0: number, d0: number, i1: number, d1: number): number[] {
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

    function sortedVertexIndices(vertexIndices: number[], projected: Point[]) {
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

    function edgeInterpolate(y0: number, v0: number, y1: number, v1: number, y2: number, v2: number): number[][] {
        const v01: number[] = interpolate(y0, v0, y1, v1);
        const v12: number[] = interpolate(y1, v1, y2, v2);
        const v02: number[] = interpolate(y0, v0, y2, v2);
        v01.pop();
        const v012 = v01.concat(v12);
        return [v02, v012];
    }

    function clipTriangle(triangle: Triangle, plane: Plane, triangles: Triangle[], vertices: Vector3[]) {
        const v0 = vertices[triangle.a];
        const v1 = vertices[triangle.b];
        const v2 = vertices[triangle.c];

        const in0 = (Vector3.Dot(plane.normal, v0) + plane.direction) > 0 ? 1 : 0;
        const in1 = (Vector3.Dot(plane.normal, v1) + plane.direction) > 0 ? 1 : 0;
        const in2 = (Vector3.Dot(plane.normal, v2) + plane.direction) > 0 ? 1 : 0;

        const count = in0 + in1 + in2;
        if (count == 0) {
            // Nothing to do - the triangle is fully clipped out.
        } else if (count == 3) {
            // The triangle is fully in front of the plane.
            triangles.push(triangle);
        } else if (count == 1) {
            // The triangle has one vertex in. Output is one clipped triangle.
        } else if (count == 2) {
            // The triangle has two vertices in. Output is two clipped triangles.
        }
    }
}
