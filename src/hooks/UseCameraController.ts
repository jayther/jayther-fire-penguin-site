import { useState, useCallback, useEffect } from 'react';
import DebugCameraController from '../common/DebugCameraController';
import Camera from '../common/Camera';

export const useCameraController = (camera: Camera) => {
  const [controller] = useState(() => new DebugCameraController(camera));

  const setCamera = useCallback((newCamera: Camera) => {
    controller.setCamera(newCamera);
  }, [controller]);

  // Update the controller's camera reference when the camera prop changes
  useEffect(() => {
    controller.setCamera(camera);
  }, [camera, controller]);

  return {
    controller,
    setCamera
  };
};

export default useCameraController;
