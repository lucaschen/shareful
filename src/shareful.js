export class Container<State: {}> {
  state: State;

  setState(state: $Shape<State>) {
    this.state = {
      ...this.state,
      ...state
    };
  }
}
