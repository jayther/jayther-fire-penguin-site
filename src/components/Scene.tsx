import './Scene.scss';
import IceFloor from './IceFloor';
import { forwardRef, ForwardedRef, useState, useEffect } from 'react';
import Ocean from './Ocean';
import Penguin from './Penguin';
import useClassName from '../hooks/UseClassName';
import usePlayer from '../hooks/UsePlayer';

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
        <Penguin ref={setPenguin} />
      </div>
    );
  }
);

export default Scene;
