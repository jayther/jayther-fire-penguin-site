import ActionObject from './ActionObject';
import AABB from './math/AABB';
import Vector2 from './math/Vector2';

export class InvisBarrier extends ActionObject {
  constructor() {
    super({ staticObject: true, collisionEnabled: true });
  }

  setExtent(extent: Vector2): void {
    const position = this.getPosition();
    this.setCollisionAABB(
      new AABB(new Vector2(position.x, position.z), extent)
    );
  }
}

export default InvisBarrier;
