import { Subscribe } from "shareful";

import CounterContainer from "@root/containers/CounterContainer";

import Step from "./Step";

const mapContainersToProps = counter => ({
  setStep: counter.setStep,
  step: counter.state.step
});

export default Subscribe([CounterContainer], mapContainersToProps)(Step);
