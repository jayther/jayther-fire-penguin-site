import { useEffect, useRef, useState } from 'react';
import { InvisBarrier } from '../common/InvisBarrier';
import './SimpleBarrier.scss';
import Vector2 from '../common/math/Vector2';
import Vector3 from '../common/math/Vector3';
import { useSearchParams } from 'react-router-dom';

export interface SimpleBarrierProps {
  id: string;
  x: number;
  y: number;
  halfXExtent: number;
  halfYExtent: number;
  showArea?: boolean;
}

// Module-level tracking to ensure single instantiation per component instance
// even in React Strict Mode (which double-renders in dev)
// Use a Map keyed by a unique string per component instance
const barrierInstances = new Map<string, InvisBarrier>();

export function SimpleBarrier({ id, x, y, halfXExtent, halfYExtent, showArea = false }: SimpleBarrierProps) {
  const [urlSearchParams] = useSearchParams();
  const [areaDiv, setAreaDiv] = useState<HTMLDivElement | null>(null);

  const showAll = urlSearchParams.has('showAll');
  
  // Get or create the barrier instance for this component
  // WeakMap ensures we reuse the same instance even after Strict Mode remount
  let invisBarrier = barrierInstances.get(id);
  if (!invisBarrier) {
    console.log('creating invisBarrier');
    invisBarrier = new InvisBarrier();
    barrierInstances.set(id, invisBarrier);
  }
  
  // Store in ref for use in effects
  const invisBarrierRef = useRef(invisBarrier);
  invisBarrierRef.current = invisBarrier;
  
  // Cleanup on unmount - only runs on actual unmount, not Strict Mode double-mount cleanup
  // useEffect(() => {
  //   return () => {
  //     const barrier = barrierInstances.get(id);
  //     if (barrier) {
  //       barrier.destroy();
  //       barrierInstances.delete(id);
  //     }
  //   };
  // }, [id]);

  useEffect(() => {
    console.log('setting position', x, y);
    invisBarrier.setPosition(new Vector3(x, 1, y));
    invisBarrier.setExtent(new Vector2(halfXExtent, halfYExtent));
  }, [invisBarrier, x, y, halfXExtent, halfYExtent]);

  useEffect(() => {
    if (!areaDiv) {
      return;
    }
    invisBarrier.setObject(areaDiv);
  }, [invisBarrier, areaDiv]);
  
  if (!showArea && !showAll) {
    return null;
  }
  const style = {
    left: `${-halfXExtent}em`,
    top: `${-halfYExtent}em`,
    width: `${halfXExtent * 2}em`,
    height: `${halfYExtent * 2}em`,
  };
  return (
    <div className="simple-barrier" style={style} ref={setAreaDiv}></div>
  );
}

export default SimpleBarrier;
