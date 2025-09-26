import Player from '../common/Player';

const globalPlayer = new Player();

const usePlayer = () => {
  return globalPlayer;
};

export default usePlayer;
