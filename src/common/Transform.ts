import Vector3 from './math/Vector3';

class Transform {
  private position: Vector3 = new Vector3(0, 0, 0);
  private rotation: Vector3 = new Vector3(0, 0, 0); // Euler angles
  private scale: Vector3 = new Vector3(1, 1, 1);
  private anchor: Vector3 = new Vector3(0, 0, 0);

  constructor() {}

  getPosition(): Vector3 {
    return this.position.clone();
  }

  getPositionMut(): Vector3 {
    return this.position;
  }

  getRotation(): Vector3 {
    return this.rotation.clone();
  }

  getRotationMut(): Vector3 {
    return this.rotation;
  }

  getScale(): Vector3 {
    return this.scale.clone();
  }

  getScaleMut(): Vector3 {
    return this.scale;
  }

  setPosition(position: Vector3): void {
    this.position = position.clone();
  }

  setRotation(rotation: Vector3): void {
    this.rotation = rotation.clone();
  }

  setScale(scale: Vector3): void {
    this.scale = scale.clone();
  }

  getAnchor(): Vector3 {
    return this.anchor.clone();
  }

  getAnchorMut(): Vector3 {
    return this.anchor;
  }

  setAnchor(anchor: Vector3): void {
    this.anchor = anchor.clone();
  }
}

export default Transform;
