import { Subscribe } from "shareful";

import CounterContainer from "@root/containers/CounterContainer";

import Counter from "./Counter";

const mapContainersToProps = counter => ({
  count: counter.state.count,
  increment: counter.increment
});

export default Subscribe([CounterContainer], mapContainersToProps)(Counter);
