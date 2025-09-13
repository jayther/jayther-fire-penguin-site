import './Scene.scss'
import IceFloor from './IceFloor'

const Scene = () => {
  return (
    <div className="scene">
      <div className="front-wall"></div>
      <div className="left-wall"></div>
      <div className="right-wall"></div>
      <IceFloor />
    </div>
  )
}

export default Scene
