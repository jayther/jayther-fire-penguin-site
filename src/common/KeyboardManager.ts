import { EventEmitter } from 'tsee';

export type KeyboardManagerEventMap = {
  'key-down': (event: KeyboardEvent) => void;
  'key-up': (event: KeyboardEvent) => void;
};

class KeyboardManager extends EventEmitter<KeyboardManagerEventMap> {
  private keyStates: { [key: string]: boolean } = {};

  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }
  private handleKeyDown(event: KeyboardEvent) {
    if (event.repeat) return;
    this.keyStates[event.key] = true;
    this.emit('key-down', event);
  }

  private handleKeyUp(event: KeyboardEvent) {
    this.keyStates[event.key] = false;
    this.emit('key-up', event);
  }

  isKeyDown(key: string) {
    return this.keyStates[key] ?? false;
  }
}

export const globalKeyboardManager = new KeyboardManager();

export default KeyboardManager;
