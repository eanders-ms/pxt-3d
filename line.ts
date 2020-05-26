// Add your code here

class Line {
    offset: Vector;
    direction: Vector;

    public static Create(offset: Vector, direction: Vector): Line {
        const line = new Line();
        return line.setVectors(offset, direction);
    }

    public setVectors(offset: Vector, direction: Vector): this {
        this.direction = direction.normal();
        if (!this.direction) return undefined;
        this.offset = offset.dup();
        return this;
    }

    public dup(): Line {
        return Line.Create(this.offset, this.direction);
    }

    public static X() { return Line.Create(Vector.Zero(3), Vector.X()); }
    public static Y() { return Line.Create(Vector.Zero(3), Vector.Y()); }
    public static Z() { return Line.Create(Vector.Zero(3), Vector.Z()); }
}