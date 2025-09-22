import Vector3 from './Vector3';

export class Matrix3 {
  public elements: number[];

  constructor(
    m00: number = 1,
    m01: number = 0,
    m02: number = 0,
    m10: number = 0,
    m11: number = 1,
    m12: number = 0,
    m20: number = 0,
    m21: number = 0,
    m22: number = 1
  ) {
    this.elements = [m00, m01, m02, m10, m11, m12, m20, m21, m22];
  }

  // Accessors
  get(row: number, col: number): number {
    return this.elements[row * 3 + col];
  }

  set(row: number, col: number, value: number): void {
    this.elements[row * 3 + col] = value;
  }

  // Basic operations
  multiply(other: Matrix3): Matrix3 {
    const result = new Matrix3();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let sum = 0;
        for (let k = 0; k < 3; k++) {
          sum += this.get(i, k) * other.get(k, j);
        }
        result.set(i, j, sum);
      }
    }
    return result;
  }

  multiplyVector(v: Vector3): Vector3 {
    return new Vector3(
      this.get(0, 0) * v.x + this.get(0, 1) * v.y + this.get(0, 2) * v.z,
      this.get(1, 0) * v.x + this.get(1, 1) * v.y + this.get(1, 2) * v.z,
      this.get(2, 0) * v.x + this.get(2, 1) * v.y + this.get(2, 2) * v.z
    );
  }

  transpose(): Matrix3 {
    return new Matrix3(
      this.get(0, 0),
      this.get(1, 0),
      this.get(2, 0),
      this.get(0, 1),
      this.get(1, 1),
      this.get(2, 1),
      this.get(0, 2),
      this.get(1, 2),
      this.get(2, 2)
    );
  }

  determinant(): number {
    const a = this.get(0, 0);
    const b = this.get(0, 1);
    const c = this.get(0, 2);
    const d = this.get(1, 0);
    const e = this.get(1, 1);
    const f = this.get(1, 2);
    const g = this.get(2, 0);
    const h = this.get(2, 1);
    const i = this.get(2, 2);

    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  }

  inverse(): Matrix3 | null {
    const det = this.determinant();
    if (Math.abs(det) < 1e-10) {
      return null; // Matrix is singular
    }

    const invDet = 1 / det;
    const result = new Matrix3();

    result.set(
      0,
      0,
      (this.get(1, 1) * this.get(2, 2) - this.get(1, 2) * this.get(2, 1)) *
        invDet
    );
    result.set(
      0,
      1,
      (this.get(0, 2) * this.get(2, 1) - this.get(0, 1) * this.get(2, 2)) *
        invDet
    );
    result.set(
      0,
      2,
      (this.get(0, 1) * this.get(1, 2) - this.get(0, 2) * this.get(1, 1)) *
        invDet
    );
    result.set(
      1,
      0,
      (this.get(1, 2) * this.get(2, 0) - this.get(1, 0) * this.get(2, 2)) *
        invDet
    );
    result.set(
      1,
      1,
      (this.get(0, 0) * this.get(2, 2) - this.get(0, 2) * this.get(2, 0)) *
        invDet
    );
    result.set(
      1,
      2,
      (this.get(0, 2) * this.get(1, 0) - this.get(0, 0) * this.get(1, 2)) *
        invDet
    );
    result.set(
      2,
      0,
      (this.get(1, 0) * this.get(2, 1) - this.get(1, 1) * this.get(2, 0)) *
        invDet
    );
    result.set(
      2,
      1,
      (this.get(0, 1) * this.get(2, 0) - this.get(0, 0) * this.get(2, 1)) *
        invDet
    );
    result.set(
      2,
      2,
      (this.get(0, 0) * this.get(1, 1) - this.get(0, 1) * this.get(1, 0)) *
        invDet
    );

    return result;
  }

  toEulerAngles(): Vector3 {
    return new Vector3(
      Math.atan2(this.get(2, 1), this.get(2, 2)),
      Math.atan2(
        -this.get(2, 0),
        Math.sqrt(
          this.get(2, 1) * this.get(2, 1) + this.get(2, 2) * this.get(2, 2)
        )
      ),
      Math.atan2(this.get(1, 0), this.get(0, 0))
    );
  }

  toAxisAngle(): { axis: Vector3; angle: number } {
    // The trace of the matrix is the sum of diagonal elements
    const trace = this.get(0, 0) + this.get(1, 1) + this.get(2, 2);

    // The angle can be calculated from the trace
    // Note: We clamp the value to [-1,1] to handle floating point errors
    const cosAngle = (trace - 1) / 2;
    const angle = Math.acos(Math.max(-1, Math.min(1, cosAngle)));

    // The axis is derived from the skew-symmetric matrix components
    const axis = new Vector3(
      this.get(2, 1) - this.get(1, 2),
      this.get(0, 2) - this.get(2, 0),
      this.get(1, 0) - this.get(0, 1)
    );

    // When angle is 0 or PI, axis calculation becomes unstable
    if (Math.abs(angle) < 1e-10 || Math.abs(angle - Math.PI) < 1e-10) {
      // Return a default axis in these cases
      return { axis: Vector3.up(), angle };
    }

    // Normalize the axis
    axis.normalizeMut();

    return { axis, angle };
  }

  // Rotation methods
  static fromEulerAngles(x: number, y: number, z: number): Matrix3 {
    const cosX = Math.cos(x);
    const sinX = Math.sin(x);
    const cosY = Math.cos(y);
    const sinY = Math.sin(y);
    const cosZ = Math.cos(z);
    const sinZ = Math.sin(z);

    // ZYX rotation order
    const m00 = cosY * cosZ;
    const m01 = -cosY * sinZ;
    const m02 = sinY;
    const m10 = sinX * sinY * cosZ + cosX * sinZ;
    const m11 = -sinX * sinY * sinZ + cosX * cosZ;
    const m12 = -sinX * cosY;
    const m20 = -cosX * sinY * cosZ + sinX * sinZ;
    const m21 = cosX * sinY * sinZ + sinX * cosZ;
    const m22 = cosX * cosY;

    return new Matrix3(m00, m01, m02, m10, m11, m12, m20, m21, m22);
  }

  static fromAxisAngle(axis: Vector3, angle: number): Matrix3 {
    const normalizedAxis = axis.normalize();
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const oneMinusCos = 1 - cos;

    const x = normalizedAxis.x;
    const y = normalizedAxis.y;
    const z = normalizedAxis.z;

    return new Matrix3(
      cos + x * x * oneMinusCos,
      x * y * oneMinusCos - z * sin,
      x * z * oneMinusCos + y * sin,
      y * x * oneMinusCos + z * sin,
      cos + y * y * oneMinusCos,
      y * z * oneMinusCos - x * sin,
      z * x * oneMinusCos - y * sin,
      z * y * oneMinusCos + x * sin,
      cos + z * z * oneMinusCos
    );
  }

  static fromQuaternion(
    qx: number,
    qy: number,
    qz: number,
    qw: number
  ): Matrix3 {
    const xx = qx * qx;
    const yy = qy * qy;
    const zz = qz * qz;
    const xy = qx * qy;
    const xz = qx * qz;
    const yz = qy * qz;
    const wx = qw * qx;
    const wy = qw * qy;
    const wz = qw * qz;

    return new Matrix3(
      1 - 2 * (yy + zz),
      2 * (xy - wz),
      2 * (xz + wy),
      2 * (xy + wz),
      1 - 2 * (xx + zz),
      2 * (yz - wx),
      2 * (xz - wy),
      2 * (yz + wx),
      1 - 2 * (xx + yy)
    );
  }

  // Utility methods
  clone(): Matrix3 {
    return new Matrix3(
      this.get(0, 0),
      this.get(0, 1),
      this.get(0, 2),
      this.get(1, 0),
      this.get(1, 1),
      this.get(1, 2),
      this.get(2, 0),
      this.get(2, 1),
      this.get(2, 2)
    );
  }

  equals(other: Matrix3): boolean {
    for (let i = 0; i < 9; i++) {
      if (Math.abs(this.elements[i] - other.elements[i]) > 1e-10) {
        return false;
      }
    }
    return true;
  }

  toString(): string {
    return `Matrix3(
      [${this.get(0, 0).toFixed(3)}, ${this.get(0, 1).toFixed(3)}, ${this.get(0, 2).toFixed(3)}]
      [${this.get(1, 0).toFixed(3)}, ${this.get(1, 1).toFixed(3)}, ${this.get(1, 2).toFixed(3)}]
      [${this.get(2, 0).toFixed(3)}, ${this.get(2, 1).toFixed(3)}, ${this.get(2, 2).toFixed(3)}]
    )`;
  }

  // Static factory methods
  static identity(): Matrix3 {
    return new Matrix3();
  }

  static zero(): Matrix3 {
    return new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0);
  }

  static rotationX(angle: number): Matrix3 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Matrix3(1, 0, 0, 0, cos, -sin, 0, sin, cos);
  }

  static rotationY(angle: number): Matrix3 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Matrix3(cos, 0, sin, 0, 1, 0, -sin, 0, cos);
  }

  static rotationZ(angle: number): Matrix3 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Matrix3(cos, -sin, 0, sin, cos, 0, 0, 0, 1);
  }
}

export default Matrix3;
