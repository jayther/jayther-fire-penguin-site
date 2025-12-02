import ActionObject from './ActionObject';
import AABB from './math/AABB';
import Vector2 from './math/Vector2';
import Vector3 from './math/Vector3';

export class InvisBarrier extends ActionObject {
  constructor() {
    super({ staticObject: true, collisionEnabled: true });
    this.setRotation(new Vector3(Math.PI / 2, 0, 0));
  }

  setExtent(extent: Vector2): void {
    const position = this.getPosition();
    this.setCollisionAABB(
      new AABB(new Vector2(position.x, position.z), extent)
    );
    const aabb = this.getCollisionAABB();
    console.log({ aabb });
  }
}

export default InvisBarrier;
