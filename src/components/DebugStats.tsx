import { useEffect, useState } from 'react';
import useGlobalCamera from '../hooks/UseGlobalCamera';
import './DebugStats.scss';

const radToDeg = (rad: number) => {
  return rad * (180 / Math.PI);
};

const DebugStats = () => {
  const camera = useGlobalCamera();
  const [nonce, setNonce] = useState(0);
  const [position, setPosition] = useState(camera.getPosition().toString());
  const [rotation, setRotation] = useState(camera.getRotation().toString());
  const [scale, setScale] = useState(camera.getScale().toString());

  useEffect(() => {
    const updateCallback = () => {
      setNonce(nonce + 1);
      const position = camera.getPosition();
      const rotation = camera.getRotation();
      const scale = camera.getScale();
      setPosition(
        `${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}`
      );
      setRotation(
        `${radToDeg(rotation.x).toFixed(2)}, ${radToDeg(rotation.y).toFixed(2)}, ${radToDeg(rotation.z).toFixed(2)}`
      );
      setScale(
        `${scale.x.toFixed(2)}, ${scale.y.toFixed(2)}, ${scale.z.toFixed(2)}`
      );
      setScale(camera.getScale().toString());
    };

    camera.on('update', updateCallback);

    return () => {
      camera.off('update', updateCallback);
    };
  }, [camera]);

  return (
    <div className="debug-stats">
      <h3>Camera</h3>
      <p>Position: {position}</p>
      <p>Rotation: {rotation}</p>
      <p>Scale: {scale}</p>
    </div>
  );
};

export default DebugStats;
