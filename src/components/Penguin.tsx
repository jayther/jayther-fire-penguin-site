import './Penguin.scss';
import { forwardRef } from 'react';

const Penguin = forwardRef(
  (
    props: React.HTMLAttributes<HTMLDivElement>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div className="penguin" {...props} ref={ref}>
        <div className="penguin-waddle">
          <div className="penguin-svg-container">

          </div>
        </div>
      </div>
    );
  }
);

export default Penguin;
