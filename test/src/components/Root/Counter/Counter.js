import React, { Component } from "react";

export default class Counter extends Component {
  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
        <button onClick={this.props.increment}>Click Me</button>
        <p>{this.props.count}</p>
      </div>
    );
  }
}
