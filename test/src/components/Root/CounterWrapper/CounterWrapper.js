// @flow

import React from "react";
import { SubscribeTag } from "shareful";

import CounterContainer from "@root/containers/CounterContainer";

import Counter from "./Counter";
import Step from "./Step";

const CounterWrapper = () => {
  return (
    <div>
      <Counter id="5" />
      <Step />
      <SubscribeTag to={[CounterContainer]}>{data => <pre>{JSON.stringify(data, null, 2)}</pre>}</SubscribeTag>
    </div>
  );
};

export default CounterWrapper;
