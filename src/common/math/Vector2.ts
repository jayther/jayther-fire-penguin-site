const EPSILON = 0.00001;

export class Vector2 {
  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  // Basic operations
  add(v: Vector2): Vector2 {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  subtract(v: Vector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  multiply(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  divide(scalar: number): Vector2 {
    return new Vector2(this.x / scalar, this.y / scalar);
  }

  // Vector operations
  dot(v: Vector2): number {
    return this.x * v.x + this.y * v.y;
  }

  cross(v: Vector2): number {
    return this.x * v.y - this.y * v.x;
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  magnitudeSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  normalize(): Vector2 {
    const mag = this.magnitude();
    if (mag < EPSILON) {
      return new Vector2(0, 0);
    }
    return mag === 0 ? new Vector2(0, 0) : this.divide(mag);
  }

  // Mutable methods (modify current instance)
  addMut(v: Vector2): Vector2 {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  subtractMut(v: Vector2): Vector2 {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  multiplyMut(scalar: number): Vector2 {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  divideMut(scalar: number): Vector2 {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  normalizeMut(): Vector2 {
    const mag = this.magnitude();
    if (mag < EPSILON) {
      this.x = 0;
      this.y = 0;
      return this;
    }
    if (mag !== 0) {
      this.x /= mag;
      this.y /= mag;
    }
    return this;
  }

  set(x: number, y: number): Vector2 {
    this.x = x;
    this.y = y;
    return this;
  }

  setFromVector(v: Vector2): Vector2 {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  zero(): Vector2 {
    this.x = 0;
    this.y = 0;
    return this;
  }

  // Utility methods
  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  equals(v: Vector2): boolean {
    return this.x === v.x && this.y === v.y;
  }

  toString(): string {
    return `Vector2(${this.x}, ${this.y})`;
  }

  // Static methods
  static zero(): Vector2 {
    return new Vector2(0, 0);
  }

  static one(): Vector2 {
    return new Vector2(1, 1);
  }

  static up(): Vector2 {
    return new Vector2(0, 1);
  }

  static down(): Vector2 {
    return new Vector2(0, -1);
  }

  static left(): Vector2 {
    return new Vector2(-1, 0);
  }

  static right(): Vector2 {
    return new Vector2(1, 0);
  }

  static distance(a: Vector2, b: Vector2): number {
    return a.subtract(b).magnitude();
  }

  static distanceSquared(a: Vector2, b: Vector2): number {
    return a.subtract(b).magnitudeSquared();
  }

  static lerp(a: Vector2, b: Vector2, t: number): Vector2 {
    return a.add(b.subtract(a).multiply(t));
  }

  static angle(a: Vector2, b: Vector2): number {
    const dot = a.normalize().dot(b.normalize());
    return Math.acos(Math.max(-1, Math.min(1, dot)));
  }

  static fromAngle(angle: number): Vector2 {
    return new Vector2(Math.cos(angle), Math.sin(angle));
  }

  toAngle(): number {
    return Math.atan2(this.y, this.x);
  }
}

export default Vector2;
