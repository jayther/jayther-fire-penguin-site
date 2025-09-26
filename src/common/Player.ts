import ActionObject from "./ActionObject";
import { Vector3 } from "./math/Vector3";
import { IS_DEBUG } from "../consts";
import { globalKeyboardManager } from "./KeyboardManager";

// we're rotated 45 degrees around the y axis
const upDirection = new Vector3(-1, 0, -1).normalize();
const leftDirection = new Vector3(-1, 0, 1).normalize();
const downDirection = new Vector3(1, 0, 1).normalize();
const rightDirection = new Vector3(1, 0, -1).normalize();

class Player extends ActionObject {

  private moveSpeed = 10.0; // em/s

  constructor() {
    super();

    this.setRotation(new Vector3(0, Math.PI / 4, 0));
    if (!IS_DEBUG) {
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.handleKeyUp = this.handleKeyUp.bind(this);
      globalKeyboardManager.on('key-down', this.handleKeyDown);
      globalKeyboardManager.on('key-up', this.handleKeyUp);
    }
  }

  private handleKeyDown(_event: KeyboardEvent) {
    this.updateVelocity();
  }
  private handleKeyUp(_event: KeyboardEvent) {
    this.updateVelocity();
  }

  private updateVelocity() {
    const velocity = new Vector3(0, 0, 0);

    if (globalKeyboardManager.isKeyDown('w')) {
      velocity.addMut(upDirection);
    }
    if (globalKeyboardManager.isKeyDown('s')) {
      velocity.addMut(downDirection);
    }
    if (globalKeyboardManager.isKeyDown('a')) {
      velocity.addMut(leftDirection);
    }
    if (globalKeyboardManager.isKeyDown('d')) {
      velocity.addMut(rightDirection);
    }
    velocity.normalizeMut();
    velocity.multiplyMut(this.moveSpeed);

    this.setVelocity(velocity);
  }
}

export default Player;
