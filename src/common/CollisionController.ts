import ActionObject from './ActionObject';

class CollisionController {
  private staticObjects: ActionObject[] = [];
  private movingObjects: ActionObject[] = [];

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
    for (const movingObject of this.movingObjects) {
      for (const staticObject of this.staticObjects) {
        if (
          staticObject
            .getCollisionAABB()
            .intersectsAABB(movingObject.getCollisionAABB())
        ) {
          console.log(`collision detected at ${timeSeconds}`);
        }
      }
    }
  }
}

export const globalCollisionController = new CollisionController();

export default CollisionController;
