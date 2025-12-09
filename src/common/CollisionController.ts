import ActionObject from './ActionObject';

interface CollisionPair {
  staticObject: ActionObject;
  movingObject: ActionObject;
  colliding: boolean;
}

function getCollisionPairKey(staticObject: ActionObject, movingObject: ActionObject): string {
  return `${staticObject.getId()}-${movingObject.getId()}`;
}

class CollisionController {
  private staticObjects: ActionObject[] = [];
  private movingObjects: ActionObject[] = [];
  private collisionPairMap: Record<string, CollisionPair> = {};

  public addStaticObject(staticObject: ActionObject): void {
    this.staticObjects.push(staticObject);
  }

  public addMovingObject(movingObject: ActionObject): void {
    this.movingObjects.push(movingObject);
  }

  public removeStaticObject(staticObject: ActionObject): void {
    this.staticObjects = this.staticObjects.filter(o => o !== staticObject);
    for (const key of Object.keys(this.collisionPairMap)) {
      if (this.collisionPairMap[key].staticObject === staticObject) {
        this.collisionPairMap[key].colliding = false;
        console.log(`collision ${key} ended at ${Date.now() / 1000} seconds`);
      }
    }
  }

  public removeMovingObject(movingObject: ActionObject): void {
    this.movingObjects = this.movingObjects.filter(o => o !== movingObject);
    for (const key of Object.keys(this.collisionPairMap)) {
      if (this.collisionPairMap[key].movingObject === movingObject) {
        this.collisionPairMap[key].colliding = false;
        console.log(`collision ${key} ended at ${Date.now() / 1000} seconds`);
      }
    }
  }

  public update(timeSeconds: number): void {
    // console.log('collision controller update', this.movingObjects, this.staticObjects);
    for (const movingObject of this.movingObjects) {
      for (const staticObject of this.staticObjects) {
        const key = getCollisionPairKey(staticObject, movingObject);
        if (
          staticObject
            .getCollisionAABB()
            .intersectsAABB(movingObject.getCollisionAABB())
        ) {
          if (!this.collisionPairMap[key]) {
            this.collisionPairMap[key] = { staticObject, movingObject, colliding: true };
            console.log(`collision ${key} started at ${Date.now() / 1000} seconds`);
          } else if (!this.collisionPairMap[key].colliding) {
            this.collisionPairMap[key].colliding = true;
            console.log(`collision ${key} started at ${Date.now() / 1000} seconds`);
          }
          // TODO: Handle collision
        } else {
          if (this.collisionPairMap[key]?.colliding) {
            this.collisionPairMap[key].colliding = false;
            console.log(`collision ${key} ended at ${Date.now() / 1000} seconds`);
          }
        }
      }
    }
  }
}

export const globalCollisionController = new CollisionController();

export default CollisionController;
