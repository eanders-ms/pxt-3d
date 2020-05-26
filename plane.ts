
class Plane {
    offset: Vector;
    normal: Vector;

    public static Create(offset: Vector, normal: Vector): Plane {
        return new Plane().setVectors(offset, normal);
    }

    public setVectors(offset: Vector, normal: Vector): this {
        this.normal = normal.normal();
        if (!this.normal) return undefined;
        this.offset = offset.dup();
        return this;
    }

    public static XY() { return Plane.Create(Vector.Zero(3), Vector.Z()); }
    public static YZ() { return Plane.Create(Vector.Zero(3), Vector.X()); }
    public static ZX() { return Plane.Create(Vector.Zero(3), Vector.Y()); }
}
