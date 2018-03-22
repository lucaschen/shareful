// @flow

import React from "react";

import Counter from "./Counter";
import Step from "./Step";

const CounterWrapper = () => {
  return (
    <div>
      <Counter id="5" />
      <Step />
    </div>
  );
};

export default CounterWrapper;
