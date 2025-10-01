import { Vector2 } from './Vector2';

const EPSILON = 0.00001;

export class AABB {
  public min: Vector2;
  public max: Vector2;

  constructor(min: Vector2 = new Vector2(), max: Vector2 = new Vector2()) {
    this.min = min.clone();
    this.max = max.clone();
  }

  // Static factory methods
  static fromCenterSize(center: Vector2, size: Vector2): AABB {
    const halfSize = size.multiply(0.5);
    return new AABB(center.subtract(halfSize), center.add(halfSize));
  }

  static fromCenterRadius(center: Vector2, radius: number): AABB {
    const halfRadius = new Vector2(radius, radius);
    return new AABB(center.subtract(halfRadius), center.add(halfRadius));
  }

  static fromPoints(points: Vector2[]): AABB {
    if (points.length === 0) {
      return new AABB();
    }

    let minX = points[0].x;
    let minY = points[0].y;
    let maxX = points[0].x;
    let maxY = points[0].y;

    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
      maxX = Math.max(maxX, point.x);
      maxY = Math.max(maxY, point.y);
    }

    return new AABB(new Vector2(minX, minY), new Vector2(maxX, maxY));
  }

  // Basic properties
  get center(): Vector2 {
    return this.min.add(this.max).multiply(0.5);
  }

  get size(): Vector2 {
    return this.max.subtract(this.min);
  }

  get extents(): Vector2 {
    return this.size.multiply(0.5);
  }

  get area(): number {
    const s = this.size;
    return s.x * s.y;
  }

  get perimeter(): number {
    const s = this.size;
    return 2 * (s.x + s.y);
  }

  // Collision detection methods
  containsPoint(point: Vector2): boolean {
    return (
      point.x >= this.min.x &&
      point.x <= this.max.x &&
      point.y >= this.min.y &&
      point.y <= this.max.y
    );
  }

  containsAABB(other: AABB): boolean {
    return (
      this.min.x <= other.min.x &&
      this.max.x >= other.max.x &&
      this.min.y <= other.min.y &&
      this.max.y >= other.max.y
    );
  }

  intersectsAABB(other: AABB): boolean {
    return (
      this.min.x <= other.max.x &&
      this.max.x >= other.min.x &&
      this.min.y <= other.max.y &&
      this.max.y >= other.min.y
    );
  }

  intersectsCircle(center: Vector2, radius: number): boolean {
    const closestPoint = new Vector2(
      Math.max(this.min.x, Math.min(center.x, this.max.x)),
      Math.max(this.min.y, Math.min(center.y, this.max.y))
    );

    const distanceSquared = center.subtract(closestPoint).magnitudeSquared();
    return distanceSquared <= radius * radius;
  }

  // Collision resolution methods
  getIntersection(other: AABB): AABB | null {
    if (!this.intersectsAABB(other)) {
      return null;
    }

    const intersectionMin = new Vector2(
      Math.max(this.min.x, other.min.x),
      Math.max(this.min.y, other.min.y)
    );

    const intersectionMax = new Vector2(
      Math.min(this.max.x, other.max.x),
      Math.min(this.max.y, other.max.y)
    );

    return new AABB(intersectionMin, intersectionMax);
  }

  getPenetrationVector(other: AABB): Vector2 | null {
    if (!this.intersectsAABB(other)) {
      return null;
    }

    const overlapX = Math.min(
      this.max.x - other.min.x,
      other.max.x - this.min.x
    );
    const overlapY = Math.min(
      this.max.y - other.min.y,
      other.max.y - this.min.y
    );

    // Find the minimum overlap axis
    let minOverlap = overlapX;
    let axis = new Vector2(1, 0);

    if (overlapY < minOverlap) {
      minOverlap = overlapY;
      axis = new Vector2(0, 1);
    }

    // Determine direction based on relative positions
    const centerDiff = this.center.subtract(other.center);
    const direction = centerDiff.dot(axis) > 0 ? 1 : -1;

    return axis.multiply(minOverlap * direction);
  }

  getClosestPoint(point: Vector2): Vector2 {
    return new Vector2(
      Math.max(this.min.x, Math.min(point.x, this.max.x)),
      Math.max(this.min.y, Math.min(point.y, this.max.y))
    );
  }

  getDistanceToPoint(point: Vector2): number {
    const closestPoint = this.getClosestPoint(point);
    return point.subtract(closestPoint).magnitude();
  }

  getDistanceToAABB(other: AABB): number {
    if (this.intersectsAABB(other)) {
      return 0;
    }

    const closestPoint = this.getClosestPoint(other.center);
    const otherClosestPoint = other.getClosestPoint(this.center);

    return closestPoint.subtract(otherClosestPoint).magnitude();
  }

  // Transform methods
  transform(): AABB {
    // This would need a proper matrix implementation
    // For now, return a copy
    return this.clone();
  }

  // Mutable methods for performance
  set(min: Vector2, max: Vector2): AABB {
    this.min.setFromVector(min);
    this.max.setFromVector(max);
    return this;
  }

  setFromAABB(other: AABB): AABB {
    this.min.setFromVector(other.min);
    this.max.setFromVector(other.max);
    return this;
  }

  expand(point: Vector2): AABB {
    this.min.x = Math.min(this.min.x, point.x);
    this.min.y = Math.min(this.min.y, point.y);
    this.max.x = Math.max(this.max.x, point.x);
    this.max.y = Math.max(this.max.y, point.y);
    return this;
  }

  expandAABB(other: AABB): AABB {
    this.min.x = Math.min(this.min.x, other.min.x);
    this.min.y = Math.min(this.min.y, other.min.y);
    this.max.x = Math.max(this.max.x, other.max.x);
    this.max.y = Math.max(this.max.y, other.max.y);
    return this;
  }

  translate(offset: Vector2): AABB {
    this.min.addMut(offset);
    this.max.addMut(offset);
    return this;
  }

  scale(scale: Vector2): AABB {
    const center = this.center;
    const extents = this.extents;

    this.min.setFromVector(
      center.subtract(new Vector2(extents.x * scale.x, extents.y * scale.y))
    );
    this.max.setFromVector(
      center.add(new Vector2(extents.x * scale.x, extents.y * scale.y))
    );
    return this;
  }

  // Utility methods
  clone(): AABB {
    return new AABB(this.min.clone(), this.max.clone());
  }

  equals(other: AABB): boolean {
    return this.min.equals(other.min) && this.max.equals(other.max);
  }

  isValid(): boolean {
    return this.min.x <= this.max.x && this.min.y <= this.max.y;
  }

  isEmpty(): boolean {
    return this.area < EPSILON;
  }

  toString(): string {
    return `AABB(min: ${this.min.toString()}, max: ${this.max.toString()})`;
  }

  // Static utility methods
  static union(a: AABB, b: AABB): AABB {
    return new AABB(
      new Vector2(Math.min(a.min.x, b.min.x), Math.min(a.min.y, b.min.y)),
      new Vector2(Math.max(a.max.x, b.max.x), Math.max(a.max.y, b.max.y))
    );
  }

  static intersection(a: AABB, b: AABB): AABB | null {
    if (!a.intersectsAABB(b)) {
      return null;
    }

    return new AABB(
      new Vector2(Math.max(a.min.x, b.min.x), Math.max(a.min.y, b.min.y)),
      new Vector2(Math.min(a.max.x, b.max.x), Math.min(a.max.y, b.max.y))
    );
  }

  static empty(): AABB {
    return new AABB();
  }

  static infinite(): AABB {
    const inf = Number.POSITIVE_INFINITY;
    return new AABB(new Vector2(-inf, -inf), new Vector2(inf, inf));
  }
}

export default AABB;
