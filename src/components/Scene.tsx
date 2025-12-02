import './Scene.scss';
import IceFloor from './IceFloor';
import { forwardRef, ForwardedRef, useState, useEffect } from 'react';
import Ocean from './Ocean';
import Penguin from './Penguin';
import useClassName from '../hooks/UseClassName';
import usePlayer from '../hooks/UsePlayer';
import SimpleBarrier from './SimpleBarrier';

const Scene = forwardRef(
  (
    { sceneTransitioning }: { sceneTransitioning: boolean },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const sceneClassName = useClassName(
      'scene',
      sceneTransitioning && 'transitioning'
    );
    const player = usePlayer();
    const [penguin, setPenguin] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
      player.setObject(penguin);
    }, [player, penguin]);

    return (
      <div className={sceneClassName} ref={ref}>
        <div className="front-wall"></div>
        <div className="left-wall"></div>
        <div className="right-wall"></div>
        <Ocean />
        <IceFloor />
        <SimpleBarrier id="barrier-1" x={10} y={10} halfXExtent={10} halfYExtent={10} showArea={true} />
        <Penguin ref={setPenguin} />
      </div>
    );
  }
);

export default Scene;
