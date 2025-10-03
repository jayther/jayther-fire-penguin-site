import { globalCollisionController } from './CollisionController';
import { IFrameUpdatable } from './IFrameUpdatable';

class FrameController {
  private updatables: IFrameUpdatable[] = [];
  private lastTime: number = 0;

  constructor() {
    this.onAnimationFrame = this.onAnimationFrame.bind(this);
    window.requestAnimationFrame(this.onAnimationFrame);
  }

  addUpdatable(updatable: IFrameUpdatable): void {
    this.updatables.push(updatable);
  }

  removeUpdatable(updatable: IFrameUpdatable): void {
    this.updatables = this.updatables.filter(u => u !== updatable);
  }

  getTime(): number {
    return this.lastTime / 1000;
  }

  private onAnimationFrame(timeMs: number): void {
    if (this.lastTime === 0) {
      this.lastTime = timeMs;
      window.requestAnimationFrame(this.onAnimationFrame);
      return;
    }

    const deltaSeconds = (timeMs - this.lastTime) / 1000;
    this.lastTime = timeMs;
    this.updateFrame(deltaSeconds);
    globalCollisionController.update(deltaSeconds);
    this.updateStyle(deltaSeconds);
    window.requestAnimationFrame(this.onAnimationFrame);
  }

  private updateFrame(deltaSeconds: number): void {
    for (const updatable of this.updatables) {
      updatable.updateFrame(deltaSeconds);
    }
  }
  private updateStyle(deltaSeconds: number): void {
    for (const updatable of this.updatables) {
      updatable.updateStyle(deltaSeconds);
    }
  }
}

export const globalFrameController = new FrameController();

export default FrameController;
