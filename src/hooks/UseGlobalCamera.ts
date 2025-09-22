import { useState } from 'react';
import Camera from '../common/Camera';

const globalCamera = new Camera();

export const getGlobalCamera = () => {
  return globalCamera;
};

const useGlobalCamera = () => {
  const [camera] = useState(() => getGlobalCamera());
  return camera;
};

export default useGlobalCamera;
