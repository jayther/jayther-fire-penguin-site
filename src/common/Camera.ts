import Vector3 from './math/Vector3';
import Transform from './Transform';
import { IFrameUpdatable } from './IFrameUpdatable';
import { globalFrameController } from './FrameController';

class Camera extends Transform implements IFrameUpdatable {
  private dirty = false;
  private sceneDiv: HTMLDivElement | null = null;

  // TODO: Use a proper event system
  private eventListeners: { [key: string]: (() => void)[] } = {};

  constructor() {
    super();
    globalFrameController.addUpdatable(this);
  }

  updateFrame(_deltaSeconds: number): void {
    // this.updateSceneDivTransform();
    // do nothing
  }

  updateStyle(_deltaSeconds: number): void {
    this.updateSceneDivTransform();
  }

  on(event: string, callback: () => void): void {
    this.eventListeners[event] ??= [];
    this.eventListeners[event].push(callback);
  }

  off(event: string, callback: () => void): void {
    this.eventListeners[event] = this.eventListeners[event]?.filter(
      cb => cb !== callback
    );
  }

  emit(event: string): void {
    this.eventListeners[event]?.forEach(callback => callback());
  }

  setSceneDiv(sceneDiv: HTMLDivElement | null): void {
    this.sceneDiv = sceneDiv;
    this.dirty = true;
    this.updateSceneDivTransform();
  }

  override setPosition(position: Vector3): void {
    super.setPosition(position);
    this.dirty = true;
  }

  override setRotation(rotation: Vector3): void {
    super.setRotation(rotation);
    this.dirty = true;
  }

  override setScale(scale: Vector3): void {
    super.setScale(scale);
    this.dirty = true;
  }

  isDirty(): boolean {
    return this.dirty;
  }

  private updateSceneDivTransform(): void {
    if (!this.sceneDiv) return;

    if (!this.dirty) return;

    const position = this.getPositionMut();
    const rotation = this.getRotationMut();

    this.sceneDiv.style.transform = `rotateX(${-rotation.x}rad) rotateY(${-rotation.y}rad) rotateZ(${-rotation.z}rad) translateX(${-position.x}em) translateY(${-position.y}em) translateZ(${-position.z}em)`;

    this.dirty = false;
    this.emit('update');
  }
}

export default Camera;
