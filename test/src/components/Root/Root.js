import React, { Component } from "react";

import Counter from "./Counter";
import Step from "./Step";

export default class Root extends Component {
  render() {
    return (
      <div>
        <Counter />
        <Step />
      </div>
    );
  }
}
