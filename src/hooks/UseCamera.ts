import { useEffect, useState } from 'react';
import Camera from '../common/Camera';

export const useCamera = (sceneDiv: HTMLDivElement | null) => {
  const [camera] = useState(() => new Camera());

  useEffect(() => {
    camera.setSceneDiv(sceneDiv);
  }, [sceneDiv]);

  return camera;
};

export default useCamera;
