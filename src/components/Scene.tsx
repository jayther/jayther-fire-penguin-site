import './Scene.scss';
import IceFloor from './IceFloor';
import { forwardRef, ForwardedRef } from 'react';
import Ocean from './Ocean';
import Penguin from './Penguin';

const Scene = forwardRef((_props: any, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className="scene" ref={ref}>
      <div className="front-wall"></div>
      <div className="left-wall"></div>
      <div className="right-wall"></div>
      <Ocean />
      <IceFloor />
      <Penguin />
    </div>
  );
});

export default Scene;
