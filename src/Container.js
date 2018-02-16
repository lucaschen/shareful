// @flow

export type ContainerType = Container<Object>;

export default class Container<State: {}> {
  state: State;
  _listeners: Array<() => mixed>;

  constructor() {
    this._listeners = [];
  }

  setState(state: ?$Shape<State>) {
    if (typeof state === "object") {
      this.state = {
        ...this.state,
        ...state
      };
    }
    this._listeners.forEach(fn => fn());
  }

  subscribe(fn: Function) {
    this._listeners.push(fn);
  }

  unsubscribe(fn: Function) {
    this._listeners = this._listeners.filter(f => f !== fn);
  }
}
