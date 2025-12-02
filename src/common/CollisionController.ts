import ActionObject from './ActionObject';

class CollisionController {
  private staticObjects: ActionObject[] = [];
  private movingObjects: ActionObject[] = [];
  private debugColliding = false;

  public addStaticObject(staticObject: ActionObject): void {
    this.staticObjects.push(staticObject);
  }

  public addMovingObject(movingObject: ActionObject): void {
    this.movingObjects.push(movingObject);
  }

  public removeStaticObject(staticObject: ActionObject): void {
    this.staticObjects = this.staticObjects.filter(o => o !== staticObject);
  }

  public removeMovingObject(movingObject: ActionObject): void {
    this.movingObjects = this.movingObjects.filter(o => o !== movingObject);
  }

  public update(timeSeconds: number): void {
    // console.log('collision controller update', this.movingObjects, this.staticObjects);
    for (const movingObject of this.movingObjects) {
      for (const staticObject of this.staticObjects) {
        if (
          staticObject
            .getCollisionAABB()
            .intersectsAABB(movingObject.getCollisionAABB())
        ) {
          if (!this.debugColliding) {
            this.debugColliding = true;
            console.log(`collision detected at ${Date.now() / 1000} seconds`);
          }
          // TODO: Handle collision
        } else {
          if (this.debugColliding) {
            this.debugColliding = false;
            console.log(`collision ended at ${Date.now() / 1000} seconds`);
          }
        }
      }
    }
  }
}

export const globalCollisionController = new CollisionController();

export default CollisionController;
