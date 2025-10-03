import { Vector2 } from './Vector2';

const EPSILON = 0.00001;

export class AABB {
  public center: Vector2;
  public halfExtents: Vector2;

  constructor(
    center: Vector2 = new Vector2(),
    halfExtents: Vector2 = new Vector2()
  ) {
    this.center = center.clone();
    this.halfExtents = halfExtents.clone();
  }

  // Static factory methods
  static fromCenterSize(center: Vector2, size: Vector2): AABB {
    const halfExtents = size.multiply(0.5);
    return new AABB(center, halfExtents);
  }

  static fromCenterRadius(center: Vector2, radius: number): AABB {
    const halfExtents = new Vector2(radius, radius);
    return new AABB(center, halfExtents);
  }

  static fromMinMax(min: Vector2, max: Vector2): AABB {
    const center = min.add(max).multiply(0.5);
    const halfExtents = max.subtract(min).multiply(0.5);
    return new AABB(center, halfExtents);
  }

  static fromPoints(points: Vector2[]): AABB {
    if (points.length === 0) {
      return new AABB();
    }

    let minX = points[0].x;
    let minY = points[0].y;
    let maxX = points[0].x;
    let maxY = points[0].y;

    for (const point of points.slice(1)) {
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
      maxX = Math.max(maxX, point.x);
      maxY = Math.max(maxY, point.y);
    }

    const center = new Vector2((minX + maxX) * 0.5, (minY + maxY) * 0.5);
    const halfExtents = new Vector2((maxX - minX) * 0.5, (maxY - minY) * 0.5);
    return new AABB(center, halfExtents);
  }

  // Basic properties
  get min(): Vector2 {
    return this.center.subtract(this.halfExtents);
  }

  get max(): Vector2 {
    return this.center.add(this.halfExtents);
  }

  get size(): Vector2 {
    return this.halfExtents.multiply(2);
  }

  get extents(): Vector2 {
    return this.halfExtents.clone();
  }

  get area(): number {
    return this.halfExtents.x * this.halfExtents.y * 4;
  }

  get perimeter(): number {
    return (this.halfExtents.x + this.halfExtents.y) * 4;
  }

  // Collision detection methods
  containsPoint(point: Vector2): boolean {
    const dx = Math.abs(point.x - this.center.x);
    const dy = Math.abs(point.y - this.center.y);
    return dx <= this.halfExtents.x && dy <= this.halfExtents.y;
  }

  containsAABB(other: AABB): boolean {
    const dx = Math.abs(other.center.x - this.center.x);
    const dy = Math.abs(other.center.y - this.center.y);
    return (
      dx + other.halfExtents.x <= this.halfExtents.x &&
      dy + other.halfExtents.y <= this.halfExtents.y
    );
  }

  intersectsAABB(other: AABB): boolean {
    const dx = Math.abs(other.center.x - this.center.x);
    const dy = Math.abs(other.center.y - this.center.y);
    return (
      dx <= this.halfExtents.x + other.halfExtents.x &&
      dy <= this.halfExtents.y + other.halfExtents.y
    );
  }

  intersectsCircle(center: Vector2, radius: number): boolean {
    const dx = Math.abs(center.x - this.center.x);
    const dy = Math.abs(center.y - this.center.y);

    const closestX = Math.min(dx, this.halfExtents.x);
    const closestY = Math.min(dy, this.halfExtents.y);

    const distanceSquared = (dx - closestX) ** 2 + (dy - closestY) ** 2;
    return distanceSquared <= radius * radius;
  }

  // Collision resolution methods
  getIntersection(other: AABB): AABB | null {
    if (!this.intersectsAABB(other)) {
      return null;
    }

    const intersectionCenter = new Vector2(
      Math.min(this.center.x, other.center.x) +
        Math.abs(this.center.x - other.center.x) * 0.5,
      Math.min(this.center.y, other.center.y) +
        Math.abs(this.center.y - other.center.y) * 0.5
    );

    const intersectionHalfExtents = new Vector2(
      Math.min(this.halfExtents.x, other.halfExtents.x) -
        Math.abs(this.center.x - other.center.x) * 0.5,
      Math.min(this.halfExtents.y, other.halfExtents.y) -
        Math.abs(this.center.y - other.center.y) * 0.5
    );

    return new AABB(intersectionCenter, intersectionHalfExtents);
  }

  getPenetrationVector(other: AABB): Vector2 | null {
    if (!this.intersectsAABB(other)) {
      return null;
    }

    const dx = other.center.x - this.center.x;
    const dy = other.center.y - this.center.y;

    const overlapX = this.halfExtents.x + other.halfExtents.x - Math.abs(dx);
    const overlapY = this.halfExtents.y + other.halfExtents.y - Math.abs(dy);

    // Find the minimum overlap axis
    let minOverlap = overlapX;
    let axis = new Vector2(Math.sign(dx), 0);

    if (overlapY < minOverlap) {
      minOverlap = overlapY;
      axis = new Vector2(0, Math.sign(dy));
    }

    return axis.multiply(minOverlap);
  }

  getClosestPoint(point: Vector2): Vector2 {
    const dx = point.x - this.center.x;
    const dy = point.y - this.center.y;

    const closestX = Math.max(
      -this.halfExtents.x,
      Math.min(dx, this.halfExtents.x)
    );
    const closestY = Math.max(
      -this.halfExtents.y,
      Math.min(dy, this.halfExtents.y)
    );

    return new Vector2(this.center.x + closestX, this.center.y + closestY);
  }

  getDistanceToPoint(point: Vector2): number {
    const dx = Math.abs(point.x - this.center.x) - this.halfExtents.x;
    const dy = Math.abs(point.y - this.center.y) - this.halfExtents.y;

    const dxClamped = Math.max(0, dx);
    const dyClamped = Math.max(0, dy);

    return Math.sqrt(dxClamped * dxClamped + dyClamped * dyClamped);
  }

  getDistanceToAABB(other: AABB): number {
    if (this.intersectsAABB(other)) {
      return 0;
    }

    const dx =
      Math.abs(other.center.x - this.center.x) -
      this.halfExtents.x -
      other.halfExtents.x;
    const dy =
      Math.abs(other.center.y - this.center.y) -
      this.halfExtents.y -
      other.halfExtents.y;

    const dxClamped = Math.max(0, dx);
    const dyClamped = Math.max(0, dy);

    return Math.sqrt(dxClamped * dxClamped + dyClamped * dyClamped);
  }

  // Transform methods
  transform(): AABB {
    // This would need a proper matrix implementation
    // For now, return a copy
    return this.clone();
  }

  // Mutable methods for performance
  set(center: Vector2, halfExtents: Vector2): AABB {
    this.center.setFromVector(center);
    this.halfExtents.setFromVector(halfExtents);
    return this;
  }

  setFromAABB(other: AABB): AABB {
    this.center.setFromVector(other.center);
    this.halfExtents.setFromVector(other.halfExtents);
    return this;
  }

  expand(point: Vector2): AABB {
    const dx = Math.abs(point.x - this.center.x);
    const dy = Math.abs(point.y - this.center.y);

    if (dx > this.halfExtents.x) {
      const newHalfExtentsX = (this.halfExtents.x + dx) * 0.5;
      const newCenterX = (this.center.x + point.x) * 0.5;
      this.center.x = newCenterX;
      this.halfExtents.x = newHalfExtentsX;
    }

    if (dy > this.halfExtents.y) {
      const newHalfExtentsY = (this.halfExtents.y + dy) * 0.5;
      const newCenterY = (this.center.y + point.y) * 0.5;
      this.center.y = newCenterY;
      this.halfExtents.y = newHalfExtentsY;
    }

    return this;
  }

  expandAABB(other: AABB): AABB {
    const minX = Math.min(this.min.x, other.min.x);
    const minY = Math.min(this.min.y, other.min.y);
    const maxX = Math.max(this.max.x, other.max.x);
    const maxY = Math.max(this.max.y, other.max.y);

    this.center.set((minX + maxX) * 0.5, (minY + maxY) * 0.5);
    this.halfExtents.set((maxX - minX) * 0.5, (maxY - minY) * 0.5);
    return this;
  }

  translate(offset: Vector2): AABB {
    this.center.addMut(offset);
    return this;
  }

  scale(scale: Vector2): AABB {
    this.halfExtents.x *= scale.x;
    this.halfExtents.y *= scale.y;
    return this;
  }

  // Utility methods
  clone(): AABB {
    return new AABB(this.center.clone(), this.halfExtents.clone());
  }

  equals(other: AABB): boolean {
    return (
      this.center.equals(other.center) &&
      this.halfExtents.equals(other.halfExtents)
    );
  }

  isValid(): boolean {
    return this.halfExtents.x >= 0 && this.halfExtents.y >= 0;
  }

  isEmpty(): boolean {
    return this.area < EPSILON;
  }

  toString(): string {
    return `AABB(center: ${this.center.toString()}, halfExtents: ${this.halfExtents.toString()})`;
  }

  // Static utility methods
  static union(a: AABB, b: AABB): AABB {
    const minX = Math.min(a.min.x, b.min.x);
    const minY = Math.min(a.min.y, b.min.y);
    const maxX = Math.max(a.max.x, b.max.x);
    const maxY = Math.max(a.max.y, b.max.y);

    const center = new Vector2((minX + maxX) * 0.5, (minY + maxY) * 0.5);
    const halfExtents = new Vector2((maxX - minX) * 0.5, (maxY - minY) * 0.5);

    return new AABB(center, halfExtents);
  }

  static intersection(a: AABB, b: AABB): AABB | null {
    if (!a.intersectsAABB(b)) {
      return null;
    }

    const intersectionCenter = new Vector2(
      Math.min(a.center.x, b.center.x) +
        Math.abs(a.center.x - b.center.x) * 0.5,
      Math.min(a.center.y, b.center.y) + Math.abs(a.center.y - b.center.y) * 0.5
    );

    const intersectionHalfExtents = new Vector2(
      Math.min(a.halfExtents.x, b.halfExtents.x) -
        Math.abs(a.center.x - b.center.x) * 0.5,
      Math.min(a.halfExtents.y, b.halfExtents.y) -
        Math.abs(a.center.y - b.center.y) * 0.5
    );

    return new AABB(intersectionCenter, intersectionHalfExtents);
  }

  static empty(): AABB {
    return new AABB();
  }

  static infinite(): AABB {
    const inf = Number.POSITIVE_INFINITY;
    return new AABB(new Vector2(0, 0), new Vector2(inf, inf));
  }
}

export default AABB;
