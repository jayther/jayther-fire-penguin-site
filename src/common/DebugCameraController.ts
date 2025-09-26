import Camera from './Camera';
import Matrix3 from './math/Matrix3';
import Vector3 from './math/Vector3';
import CameraController from './CameraController';

class DebugCameraController extends CameraController {
  private moveSpeed = 5.0;
  private rotationSpeed = Math.PI / 24;

  constructor(camera: Camera) {
    super({ camera: camera, sceneTransitioning: true });
    window.addEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!this.camera) return;
    if (event.key === 'w') {
      const currentPosition = this.camera.getPosition();
      const currentRotation = this.camera.getRotation();
      const rotMatrix = Matrix3.fromEulerAngles(0, currentRotation.y, 0);
      const newPosition = currentPosition.add(
        rotMatrix.multiplyVector(Vector3.forward().multiply(-this.moveSpeed))
      );
      this.camera.setPosition(newPosition);
    }
    if (event.key === 's') {
      const currentPosition = this.camera.getPosition();
      const currentRotation = this.camera.getRotation();
      const rotMatrix = Matrix3.fromEulerAngles(0, currentRotation.y, 0);
      const newPosition = currentPosition.add(
        rotMatrix.multiplyVector(Vector3.forward().multiply(this.moveSpeed))
      );
      this.camera.setPosition(newPosition);
    }
    if (event.key === 'a') {
      const currentPosition = this.camera.getPosition();
      const currentRotation = this.camera.getRotation();
      const rotMatrix = Matrix3.fromEulerAngles(0, currentRotation.y, 0);
      const newPosition = currentPosition.add(
        rotMatrix.multiplyVector(Vector3.left().multiply(this.moveSpeed))
      );
      this.camera.setPosition(newPosition);
    }
    if (event.key === 'd') {
      const currentPosition = this.camera.getPosition();
      const currentRotation = this.camera.getRotation();
      const rotMatrix = Matrix3.fromEulerAngles(0, currentRotation.y, 0);
      const newPosition = currentPosition.add(
        rotMatrix.multiplyVector(Vector3.right().multiply(this.moveSpeed))
      );
      this.camera.setPosition(newPosition);
    }
    if (event.key === 'i') {
      const currentRotation = this.camera.getRotation();
      this.camera.setRotation(
        new Vector3(
          currentRotation.x + this.rotationSpeed,
          currentRotation.y,
          currentRotation.z
        )
      );
    }
    if (event.key === 'k') {
      const currentRotation = this.camera.getRotation();
      const newRotation = new Vector3(
        currentRotation.x - this.rotationSpeed,
        currentRotation.y,
        currentRotation.z
      );
      this.camera.setRotation(newRotation);
    }
    if (event.key === 'j') {
      const currentRotation = this.camera.getRotation();
      const newRotation = new Vector3(
        currentRotation.x,
        currentRotation.y + this.rotationSpeed,
        currentRotation.z
      );
      this.camera.setRotation(newRotation);
    }
    if (event.key === 'l') {
      const currentRotation = this.camera.getRotation();
      const newRotation = new Vector3(
        currentRotation.x,
        currentRotation.y - this.rotationSpeed,
        currentRotation.z
      );
      this.camera.setRotation(newRotation);
    }
    if (event.key === ' ') {
      const currentPosition = this.camera.getPosition();
      const newPosition = new Vector3(
        currentPosition.x,
        currentPosition.y - this.moveSpeed,
        currentPosition.z
      );
      this.camera.setPosition(newPosition);
    }
    if (event.key === 'Control') {
      const currentPosition = this.camera.getPosition();
      const newPosition = new Vector3(
        currentPosition.x,
        currentPosition.y + this.moveSpeed,
        currentPosition.z
      );
      this.camera.setPosition(newPosition);
    }
  };
}

export default DebugCameraController;
