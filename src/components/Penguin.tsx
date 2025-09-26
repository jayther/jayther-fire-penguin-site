import './Penguin.scss';
import PenguinSVG from '../assets/penguin-full-body.svg';
import { forwardRef } from 'react';

const Penguin = forwardRef(
  (
    props: React.HTMLAttributes<HTMLDivElement>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div className="penguin" {...props} ref={ref}>
        <PenguinSVG />
      </div>
    );
  }
);

export default Penguin;
