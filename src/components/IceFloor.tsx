import useClassName from '../hooks/UseClassName';
import './IceFloor.scss';

const IceFloorBlockGroupJ = ({ flipped = false }: { flipped?: boolean }) => {
  const className = useClassName(
    'ice-floor-block-group',
    'ice-floor-block-group-j',
    flipped && 'flipped'
  );

  return (
    <div className={className}>
      <div className="ice-floor-block b-j-1"></div>
      <div className="ice-floor-block b-j-2"></div>
      <div className="ice-floor-block b-j-3"></div>
      <div className="ice-floor-block b-j-4"></div>
      <div className="ice-floor-block b-j-5"></div>
      <div className="ice-floor-block b-j-6"></div>
      <div className="ice-floor-block b-j-7"></div>
    </div>
  );
};

const IceFloorBlockGroupA = ({ flipped = false }: { flipped?: boolean }) => {
  const className = useClassName(
    'ice-floor-block-group',
    'ice-floor-block-group-a',
    flipped && 'flipped'
  );

  return (
    <div className={className}>
      <div className="ice-floor-block b-a-1"></div>
      <div className="ice-floor-block b-a-2"></div>
      <div className="ice-floor-block b-a-3"></div>
      <div className="ice-floor-block b-a-4"></div>
      <div className="ice-floor-block b-a-5"></div>
      <div className="ice-floor-block b-a-6"></div>
      <div className="ice-floor-block b-a-7"></div>
      <div className="ice-floor-block b-a-8"></div>
      <div className="ice-floor-block b-a-9"></div>
      <div className="ice-floor-block b-a-10"></div>
      <div className="ice-floor-block b-a-11"></div>
      <div className="ice-floor-block b-a-12"></div>
    </div>
  );
};

const IceFloorBlockGroupY = ({ flipped = false }: { flipped?: boolean }) => {
  const className = useClassName(
    'ice-floor-block-group',
    'ice-floor-block-group-y',
    flipped && 'flipped'
  );

  return (
    <div className={className}>
      <div className="ice-floor-block b-y-1"></div>
      <div className="ice-floor-block b-y-2"></div>
      <div className="ice-floor-block b-y-3"></div>
      <div className="ice-floor-block b-y-4"></div>
      <div className="ice-floor-block b-y-5"></div>
      <div className="ice-floor-block b-y-6"></div>
      <div className="ice-floor-block b-y-7"></div>
      <div className="ice-floor-block b-y-8"></div>
      <div className="ice-floor-block b-y-9"></div>
    </div>
  );
};

const IceFloorBlockGroupT = () => {
  return (
    <div className="ice-floor-block-group ice-floor-block-group-t">
      <div className="ice-floor-block b-t-1"></div>
      <div className="ice-floor-block b-t-2"></div>
      <div className="ice-floor-block b-t-3"></div>
      <div className="ice-floor-block b-t-4"></div>
      <div className="ice-floor-block b-t-5"></div>
      <div className="ice-floor-block b-t-6"></div>
      <div className="ice-floor-block b-t-7"></div>
    </div>
  );
};

const IceFloorBlockGroupH = () => {
  return <IceFloorBlockGroupY flipped />;
};
const IceFloorBlockGroupE = () => {
  return <IceFloorBlockGroupA flipped />;
};
const IceFloorBlockGroupR = () => {
  return <IceFloorBlockGroupJ flipped />;
};

const IceFloor = () => {
  return (
    <div className="ice-floor">
      {/* <div className="ice-floor-block-group-container">
        <IceFloorBlockGroupJ />
        <IceFloorBlockGroupA />
        <IceFloorBlockGroupY />
        <IceFloorBlockGroupT />
        <IceFloorBlockGroupH />
        <IceFloorBlockGroupE />
        <IceFloorBlockGroupR />
      </div> */}
    </div>
  );
};

export default IceFloor;
