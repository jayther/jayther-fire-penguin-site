import ActionObject from './ActionObject';
import { Vector3 } from './math/Vector3';
import { IS_DEBUG } from '../consts';
import { globalKeyboardManager } from './KeyboardManager';
import { globalFrameController } from './FrameController';

// we're rotated 45 degrees around the y axis
const upDirection = new Vector3(-1, 0, -1).normalize();
const leftDirection = new Vector3(-1, 0, 1).normalize();
const downDirection = new Vector3(1, 0, 1).normalize();
const rightDirection = new Vector3(1, 0, -1).normalize();

type WaddleState = 'idle' | 'waddle' | 'ending';

const penguinAngle = Math.PI / 4;

const waddleLerp = (angleRad: number, t: number) => Math.sin(t * Math.PI * 2) * angleRad;

const waddleEndLerp = (startAngle: number, t: number) => {
  // Ease out cubic function: 1 - (1-t)^3
  const easeOut = 1 - Math.pow(1 - t, 3);
  return startAngle * (1 - easeOut);
};


class Player extends ActionObject {
  private moveSpeed = 10.0; // em/s
  private waddleState: WaddleState = 'idle';
  private waddleStartTime: number = 0;
  private waddleDuration: number = 1.0; // seconds
  private waddleEndTime: number = 0;
  private waddleEndDuration: number = 0.5; // seconds
  private waddleEndAngle: number = 0;
  private waddleAngle: number = Math.PI / 24; // 7.5 degrees in radians


  constructor() {
    super();

    this.setPosition(new Vector3(0, 0, 0));
    this.setRotation(new Vector3(0, penguinAngle, 0));
    this.setAnchor(new Vector3(0, 0, 0));
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

  override updateFrame(deltaSeconds: number): void {
    const velocity = this.getVelocity();
    const isMoving = velocity.x !== 0 || velocity.y !== 0 || velocity.z !== 0;
    const time = globalFrameController.getTime(); // seconds
    if (this.waddleState === 'idle') {
      if (isMoving) {
        this.waddleStartTime = time;
        this.waddleState = 'waddle';
      } else {
        // do nothing
      }
    } else if (this.waddleState === 'waddle') {
      if (!isMoving) {
        this.waddleEndTime = time;
        this.waddleState = 'ending';
        this.waddleEndAngle = this.getRotation().z;
      } else {
        const angle = waddleLerp(this.waddleAngle, (time - this.waddleStartTime) / this.waddleDuration);
        if (angle > 0) {
          this.setAnchor(new Vector3(1.0, 0, 0));
        } else {
          this.setAnchor(new Vector3(-1.0, 0, 0));
        }
        this.setRotation(new Vector3(0, penguinAngle, angle));
      }
    } else if (this.waddleState === 'ending') {
      if (isMoving) {
        this.waddleState = 'waddle';
        // TODO: use current angle to find a correct sensible waddle start time to resume from
      } else if (time >= this.waddleEndTime + this.waddleEndDuration) {
        this.waddleState = 'idle';
        this.setRotation(new Vector3(0, penguinAngle, 0));
      } else {
        const angle = waddleEndLerp(this.waddleEndAngle, (time - this.waddleEndTime) / this.waddleEndDuration);
        if (angle > 0) {
          this.setAnchor(new Vector3(1.0, 0, 0));
        } else {
          this.setAnchor(new Vector3(-1.0, 0, 0));
        }
        this.setRotation(new Vector3(0, penguinAngle, angle))
      }
    }

    super.updateFrame(deltaSeconds);
  }
}

export default Player;
