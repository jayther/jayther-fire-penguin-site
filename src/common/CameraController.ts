import Camera from "./Camera";
import { EventEmitter } from "tsee";

export type CameraControllerEventMap = {
  'camera-updated': ({ camera }: { camera: Camera | null }) => void;
  'scene-transitioning-updated': ({ sceneTransitioning }: { sceneTransitioning: boolean }) => void;
}

class CameraController extends EventEmitter<CameraControllerEventMap> {  

  public camera: Camera | null = null;
  private sceneTransitioning = false;

  constructor({ camera = null, sceneTransitioning = false }: { camera: Camera | null, sceneTransitioning: boolean } = { camera: null, sceneTransitioning: false }) {
    super();
    this.camera = camera;
    this.sceneTransitioning = sceneTransitioning;
  }
  
  setCamera(camera: Camera | null): void {
    this.camera = camera;
    this.emit('camera-updated', { camera });
  }

  getCamera(): Camera | null {
    return this.camera;
  }

  setSceneTransitioning(sceneTransitioning: boolean): void {
    this.sceneTransitioning = sceneTransitioning;
    this.emit('scene-transitioning-updated', { sceneTransitioning });
  }

  getSceneTransitioning(): boolean {
    return this.sceneTransitioning;
  }
}

export default CameraController;
