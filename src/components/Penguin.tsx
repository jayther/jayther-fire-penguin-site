import './Penguin.scss';
import PenguinSVG from '../assets/penguin-full-body.svg';

const Penguin = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="penguin" {...props}>
      <PenguinSVG />
    </div>
  );
};

export default Penguin;