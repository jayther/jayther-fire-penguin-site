import Vector3 from './math/Vector3';
import Transform from './Transform';
import { EventEmitter } from 'tsee';
import { IFrameUpdatable } from './IFrameUpdatable';
import { globalFrameController } from './FrameController';

export type ActionObjectEventMap = {
  'position-updated': ({ position }: { position: Vector3 }) => void;
  'rotation-updated': ({ rotation }: { rotation: Vector3 }) => void;
  'scale-updated': ({ scale }: { scale: Vector3 }) => void;
};

class ActionObject
  extends Transform
  implements EventEmitter<ActionObjectEventMap>, IFrameUpdatable
{
  private object: HTMLElement | null = null;
  private eventEmitter = new EventEmitter<ActionObjectEventMap>();
  private dirty = false;
  private velocity = new Vector3(0, 0, 0);

  constructor(
    { object = null }: { object: HTMLElement | null } = { object: null }
  ) {
    super();
    this.object = object;
    globalFrameController.addUpdatable(this);
  }

  setObject(object: HTMLElement | null): void {
    this.object = object;
  }

  getObject(): HTMLElement | null {
    return this.object;
  }

  setVelocity(velocity: Vector3): void {
    this.velocity = velocity;
  }

  getVelocity(): Vector3 {
    return this.velocity;
  }

  setPosition(position: Vector3): void {
    super.setPosition(position);
    this.dirty = true;
    this.eventEmitter.emit('position-updated', { position });
    console.log('position-updated', position);
  }

  setRotation(rotation: Vector3): void {
    super.setRotation(rotation);
    this.dirty = true;
    this.eventEmitter.emit('rotation-updated', { rotation });
    console.log('rotation-updated', rotation);
  }

  setScale(scale: Vector3): void {
    super.setScale(scale);
    this.dirty = true;
    this.eventEmitter.emit('scale-updated', { scale });
  }

  on<K extends keyof ActionObjectEventMap>(
    event: K,
    listener: ActionObjectEventMap[K]
  ): this {
    this.eventEmitter.on(event, listener);
    return this;
  }

  off<K extends keyof ActionObjectEventMap>(
    event: K,
    listener: ActionObjectEventMap[K]
  ): this {
    this.eventEmitter.off(event, listener);
    return this;
  }

  emit<K extends keyof ActionObjectEventMap>(
    event: K,
    ...args: Parameters<ActionObjectEventMap[K]>
  ): boolean {
    return this.eventEmitter.emit(event, ...args);
  }

  once<K extends keyof ActionObjectEventMap>(
    event: K,
    listener: ActionObjectEventMap[K]
  ): this {
    this.eventEmitter.once(event, listener);
    return this;
  }

  addListener<K extends keyof ActionObjectEventMap>(
    event: K,
    listener: ActionObjectEventMap[K]
  ): this {
    this.eventEmitter.addListener(event, listener);
    return this;
  }

  removeListener<K extends keyof ActionObjectEventMap>(
    event: K,
    listener: ActionObjectEventMap[K]
  ): this {
    this.eventEmitter.removeListener(event, listener);
    return this;
  }

  hasListeners<K extends keyof ActionObjectEventMap>(event: K): boolean {
    return this.eventEmitter.hasListeners(event);
  }

  prependListener<K extends keyof ActionObjectEventMap>(
    event: K,
    listener: ActionObjectEventMap[K]
  ): this {
    this.eventEmitter.prependListener(event, listener);
    return this;
  }

  prependOnceListener<K extends keyof ActionObjectEventMap>(
    event: K,
    listener: ActionObjectEventMap[K]
  ): this {
    this.eventEmitter.prependOnceListener(event, listener);
    return this;
  }

  removeAllListeners<K extends keyof ActionObjectEventMap>(event?: K): this {
    this.eventEmitter.removeAllListeners(event);
    return this;
  }

  setMaxListeners(n: number): this {
    this.eventEmitter.setMaxListeners(n);
    return this;
  }

  getMaxListeners(): number {
    return this.eventEmitter.getMaxListeners();
  }

  listeners<K extends keyof ActionObjectEventMap>(
    event: K
  ): ActionObjectEventMap[K][] {
    return this.eventEmitter.listeners(event);
  }

  get rawListeners() {
    return this.eventEmitter.rawListeners;
  }

  get events() {
    return this.eventEmitter.events;
  }

  get listenerCount() {
    return this.eventEmitter.listenerCount;
  }

  get eventNames() {
    return this.eventEmitter.eventNames;
  }

  get maxListeners() {
    return this.eventEmitter.maxListeners;
  }

  updateStyle(): void {
    if (!this.object) return;
    this.object.style.transform = `translateX(${this.getPosition().x}em) translateY(${this.getPosition().y}em) translateZ(${this.getPosition().z}em) rotateX(${this.getRotation().x}rad) rotateY(${this.getRotation().y}rad) rotateZ(${this.getRotation().z}rad) scaleX(${this.getScale().x}) scaleY(${this.getScale().y}) scaleZ(${this.getScale().z})`;
  }

  updateFrame(deltaSeconds: number): void {
    if (
      !this.dirty &&
      this.velocity.x === 0 &&
      this.velocity.y === 0 &&
      this.velocity.z === 0
    )
      return;

    this.setPosition(
      this.getPosition().add(this.velocity.multiply(deltaSeconds))
    );
    this.updateStyle();
    this.dirty = false;
  }
}

export default ActionObject;
