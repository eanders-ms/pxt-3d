
namespace threed {
    export const LightModel = {
        None: 0,
        Flat: 1,
        Dither: 2,
        Count: 3
    }

    const ViewportSize = 1;
    const ProjectionPlaneZ = 1;
    const Dither = img`
        1 1 1 1 . 1 1 1 . 1 1 1 . 1 1 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . . . 1 . . . 1 . . . 1 . . . .
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 1 1 1 . 1 1 1 . 1 1 1 . 1 . . . 1 . . . 1 . . . 1 . . . . . . . . . . . . . . . . . . . . .
        1 1 1 1 1 1 1 1 1 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . . . . . . . . . .
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 1 . 1 . 1 . 1 . 1 . 1 . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . .
    `;

    export interface IRenderer {
        backfaceCulling: boolean;
        depthCheckEnabled: boolean;
        overWire: boolean;
        lightModel: number;
        render(): void;
    }

    export class Renderer0 implements IRenderer {
        private image: Image;
        private depth: number[];

        public backfaceCulling = true;
        public depthCheckEnabled = true;
        public overWire = false;
        public lightModel = LightModel.Flat;

        constructor(private engine: Engine) {
            this.image = scene.backgroundImage();
        }

        public render() {
            if (this.depthCheckEnabled) {
                this.depth = [];
                // hardware-specific compiler doesn't like this line
                //this.depth.length = this.image.width * this.image.height;
            }
            this.image.fill(Colors.Black);
            this.renderScene();
        }

        private renderScene() {
            this.engine.camera.updateTransform();
            for (const instance of this.engine.instances) {
                instance.updateTransform();
                const clipped = this.transformAndClip(instance);
                if (clipped) {
                    this.renderModel(instance.color, clipped);
                }
            }
        }

        private transformAndClip(instance: Instance) {
            const transform = Matrix4x4.Multiply(this.engine.camera.transform, instance.transform);
            const center = Matrix4x4.MultiplyVector4(transform, instance.model.center.toVector4()).toVector3();
            const radius2 = Fx.mul(instance.model.radius, instance.model.radius);

            for (const plane of this.engine.camera.clippingPlanes) {
                const distance2 = Fx.add(Vector3.Dot(plane.normal, center), plane.direction);
                if (distance2 < Fx.mul(Fx8(-1), radius2)) {
                    return null;
                }
            }

            let vertices = [];
            for (const vertex of instance.model.vertices) {
                vertices.push(Matrix4x4.MultiplyVector4(transform, vertex.toVector4()).toVector3());
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

        private renderModel(color: number, model: Model) {
            const projected: Point[] = [];
            for (const vertex of model.vertices) {
                projected.push(this.projectVertex(vertex));
            }
            for (const triangle of model.triangles) {
                this.renderTriangle(color, triangle, model.vertices, projected);
            }
        }

        private renderTriangle(color: number, triangle: Triangle, vertices: Vector3[], projected: Point[]) {
            // Sort by projected point Y.
            const ti = triangle.indices;
            const sorted = sortedVertexIndices(ti, projected);
            const [i0, i1, i2] = sorted;

            const v0 = vertices[ti[i0]];
            const v1 = vertices[ti[i1]];
            const v2 = vertices[ti[i2]];

            // Compute triangle normal. Use the unsorted vertices, otherwise the winding of the points may change.
            const normal = computeTriangleNormal(vertices[ti[0]], vertices[ti[1]], vertices[ti[2]]);

            // Backface culling.
            if (this.backfaceCulling) {
                const center = Vector3.Scale(Fx8(-1.0 / 3.0),
                    Vector3.Add(Vector3.Add(vertices[ti[0]], vertices[ti[1]]), vertices[ti[2]]));
                if (Vector3.Dot(center, normal) < Fx.zeroFx8) {
                    return;
                }
            }

            // Get attribute values (X, 1/Z) at the vertices.
            const p0 = projected[ti[i0]];
            const p1 = projected[ti[i1]];
            const p2 = projected[ti[i2]];

            // Compute attribute values at the edges.
            const [x02, x012] = edgeInterpolate(p0.y, p0.x, p1.y, p1.x, p2.y, p2.x);
            let iz02: number[], iz012: number[];

            if (this.depthCheckEnabled) {
                [iz02, iz012] = edgeInterpolate(p0.y, 1 / Fx.toFloat(v0.z), p1.y, 1 / Fx.toFloat(v1.z), p2.y, 1 / Fx.toFloat(v2.z));
            }
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

            const rotatedLight = Matrix4x4.MultiplyVector4(this.engine.camera.transposedOrientation, this.engine.light.direction.toVector4()).toVector3();
            const cosLightAngle = Vector3.Dot(rotatedLight, normal);

            if (this.lightModel === LightModel.Flat) {
                if (cosLightAngle < Fx.zeroFx8) {
                    color = Colors.Shaded(color);
                }
            }

            // Draw horizontal segments.
            for (let y = p0.y; y < p2.y; ++y) {
                const xl = x_left[y - p0.y] | 0;
                const xr = x_right[y - p0.y] | 0;

                const screeny = (this.image.height >> 1) - (y | 0) - 1;

                for (let x = xl; x < xr; ++x) {
                    let zscan: number[] = [];
                    if (this.depthCheckEnabled) {
                        const [zl, zr] = [iz_left[y - p0.y], iz_right[y - p0.y]];
                        zscan = interpolate(xl, zl, xr, zr);
                    }
                    if (this.writeDepth(x, y, zscan[x - xl])) {
                        if (this.lightModel === LightModel.Dither) {
                            let shaded = 0;
                            if (cosLightAngle < Fx.zeroFx8) {
                                shaded = 1;
                            } else {
                                let lightRamp = Fx.toFloat(cosLightAngle);
                                const ditherOffset = Math.floor(lightRamp * 17) * 4;
                                let screenx = (this.image.width >> 1) + (x | 0);
                                let ditherX = ditherOffset + (screenx % 4);
                                let ditherY = screeny % 4;
                                let ditherPixel = Dither.getPixel(ditherX, ditherY);
                                shaded = ditherPixel ? 1 : 0;
                            }
                            this.putPixel(x, y, color + shaded);
                        } else {
                            this.putPixel(x, y, color);
                        }
                    }
                }
            }
            if (this.overWire) {
                this.drawLine(p0, p1, Colors.Black);
                this.drawLine(p0, p2, Colors.Black);
                this.drawLine(p2, p1, Colors.Black);
            }
        }

        private writeDepth(x: number, y: number, inv_z: number) {
            if (!this.depthCheckEnabled) return true;
            if (inv_z === undefined) return true;

            x = (this.image.width >> 1) + (x | 0);
            y = (this.image.height >> 1) - (y | 0) - 1;

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
            x = (this.image.width >> 1) + (x | 0);
            y = (this.image.height >> 1) - (y | 0) - 1;

            if (x < 0 || x >= this.image.width || y < 0 || y >= this.image.height) {
                return;
            }

            this.image.setPixel(x, y, color);
        }

        private drawLine(p0: Point, p1: Point, color: number) {
            const dx = p1.x - p0.x;
            const dy = p1.y - p0.y;

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
                (p2d.x * this.image.width / ViewportSize) | 0,
                (p2d.y * this.image.height / ViewportSize) | 0);
        }

        private imageToViewport(p2d: Point) {
            return new Point(
                (p2d.x * ViewportSize / this.image.width),
                (p2d.y * ViewportSize / this.image.height));
        }

        private projectVertex(v: Vector3) {
            const z = Fx.toFloat(v.z);
            return this.viewportToImage(new Point(
                Fx.toFloat(v.x) * ProjectionPlaneZ / z,
                Fx.toFloat(v.y) * ProjectionPlaneZ / z));
        }
    }

    function interpolate(i0: number, d0: number, i1: number, d1: number): number[] {
        if (i0 === i1) {
            return [d0];
        }

        const values = [];
        const a = (d1 - d0) / (i1 - i0);
        let d = d0;
        for (let i = i0; i <= i1; ++i) {
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
        const v0v1 = Vector3.Add(v1, Vector3.Scale(negOneFx8, v0));
        const v0v2 = Vector3.Add(v2, Vector3.Scale(negOneFx8, v0));
        return Vector3.Normalized(Vector3.Cross(v0v1, v0v2));
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
        const v0 = vertices[triangle.indices[0]];
        const v1 = vertices[triangle.indices[1]];
        const v2 = vertices[triangle.indices[2]];

        const in0 = Fx.add(Vector3.Dot(plane.normal, v0), plane.direction) > Fx.zeroFx8 ? 1 : 0;
        const in1 = Fx.add(Vector3.Dot(plane.normal, v1), plane.direction) > Fx.zeroFx8 ? 1 : 0;
        const in2 = Fx.add(Vector3.Dot(plane.normal, v2), plane.direction) > Fx.zeroFx8 ? 1 : 0;

        const count = in0 + in1 + in2;
        if (count === 0) {
            // Nothing to do - the triangle is fully clipped out.
        } else if (count === 3) {
            // The triangle is fully in front of the plane.
            triangles.push(triangle);
        } else if (count === 1) {
            // TODO: The triangle has one vertex in. Output is one clipped triangle.
        } else if (count === 2) {
            // TODO: The triangle has two vertices in. Output is two clipped triangles.
        }
    }
}
