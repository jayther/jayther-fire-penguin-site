export interface IFrameUpdatable {
  updateFrame(deltaSeconds: number): void;
  updateStyle(deltaSeconds: number): void;
}
