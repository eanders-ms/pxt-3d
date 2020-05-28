
namespace threed {
    export class Transform {
        public position = Vector.Zero(3);
        public rotation = Quaternion.Identity();
        public scale =Vector.One(3);
    }
}
