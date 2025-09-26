import { useState, useCallback, useEffect, useMemo } from 'react';
import DebugCameraController from '../common/DebugCameraController';
import Camera from '../common/Camera';
import PlayerCameraController from '../common/PlayerCameraController';
import ActionObject from '../common/ActionObject';
import { IS_DEBUG } from '../consts';

export const useCameraController = (
  camera: Camera,
  actionObject?: ActionObject | null
) => {
  // const [controller] = useState(() => new DebugCameraController(camera));
  const [controller] = useState(() =>
    IS_DEBUG
      ? new DebugCameraController(camera)
      : new PlayerCameraController({ camera, actionObject })
  );
  const [sceneTransitioning, setSceneTransitioning] = useState(
    controller.getSceneTransitioning()
  );

  const setCamera = useCallback(
    (newCamera: Camera) => {
      controller.setCamera(newCamera);
    },
    [controller]
  );

  // Update the controller's camera reference when the camera prop changes
  useEffect(() => {
    controller.setCamera(camera);
  }, [camera, controller]);

  useEffect(() => {
    if (IS_DEBUG) return;
    (controller as PlayerCameraController).setActionObject(
      actionObject ?? null
    );
  }, [actionObject, controller]);

  useEffect(() => {
    controller.on('scene-transitioning-updated', event => {
      setSceneTransitioning(event.sceneTransitioning);
    });

    return () => {
      controller.off('scene-transitioning-updated', event => {
        setSceneTransitioning(event.sceneTransitioning);
      });
    };
  }, [controller]);

  return {
    controller,
    setCamera,
    sceneTransitioning,
  };
};

export default useCameraController;
