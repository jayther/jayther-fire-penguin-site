import ActionObject from "./ActionObject";
import Camera from "./Camera";
import CameraController from "./CameraController";
import { Vector3 } from "./math/Vector3";

class PlayerCameraController extends CameraController {

  private actionObject: ActionObject | null = null;

  private cameraRotOffset: Vector3 = new Vector3(Math.PI / 4, Math.PI / 4, 0);
  private cameraPosOffset: Vector3 = new Vector3(Math.cos(this.cameraRotOffset.y), 0, Math.sin(this.cameraRotOffset.y)).multiply(-20).add(new Vector3(0, 20, 0));

  constructor({ camera = null, actionObject = null }: { camera: Camera | null, actionObject?: ActionObject | null } = { camera: null, actionObject: null }) {
    super({ camera: camera, sceneTransitioning: false });
    this.onPositionUpdated = this.onPositionUpdated.bind(this);
    this.actionObject = actionObject;
    this.attachToActionObject(actionObject);
  }

  setActionObject(actionObject: ActionObject | null): void {
    this.actionObject = actionObject;
  }

  attachToActionObject(actionObject: ActionObject | null): void {
    if (this.actionObject) {
      this.actionObject.off('position-updated', this.onPositionUpdated);
    }
    this.actionObject = actionObject;
    this.actionObject?.on('position-updated', this.onPositionUpdated);
  }

  getActionObject(): ActionObject | null {
    return this.actionObject;
  }

  private onPositionUpdated(event: { position: Vector3 }): void {
    if (!this.camera) return;
    this.camera.setPosition(event.position.add(this.cameraPosOffset));
    this.camera.setRotation(this.cameraRotOffset);
  }

  update(): void {
    if (!this.actionObject) return;
    if (!this.camera) return;

    this.camera.setPosition(this.actionObject.getPosition());
    // this.camera.setRotation(this.actionObject.getRotation());
  }
}

export default PlayerCameraController;
