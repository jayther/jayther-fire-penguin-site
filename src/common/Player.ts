import ActionObject from "./ActionObject";
import { Vector3 } from "./math/Vector3";
import { IS_DEBUG } from "../consts";

// we're rotated 45 degrees around the y axis
const upDirection = new Vector3(-1, 0, -1).normalize();
const leftDirection = new Vector3(-1, 0, 1).normalize();
const downDirection = new Vector3(1, 0, 1).normalize();
const rightDirection = new Vector3(1, 0, -1).normalize();

class Player extends ActionObject {

  private moveSpeed = 1.0;

  constructor() {
    super();

    if (!IS_DEBUG) {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
      this.setRotation(new Vector3(0, Math.PI / 4, 0));
      console.log('Rotation set to', this.getRotation());
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.repeat) return;
    console.log('handleKeyDown', event.key);

    if (event.key === 'w') {
      const delta = upDirection.multiply(this.moveSpeed);
      this.setPosition(this.getPosition().add(delta));
    } 
    if (event.key === 's') {
      const delta = downDirection.multiply(this.moveSpeed);
      this.setPosition(this.getPosition().add(delta));
    } 
    if (event.key === 'a') {
      const delta = leftDirection.multiply(this.moveSpeed);
      this.setPosition(this.getPosition().add(delta));
    } 
    if (event.key === 'd') {
      const delta = rightDirection.multiply(this.moveSpeed);
      this.setPosition(this.getPosition().add(delta));
    }
  }


}

export default Player;
