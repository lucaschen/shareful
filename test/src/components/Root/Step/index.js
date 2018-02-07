import { Subscribe } from "shareful";

import CounterContainer from "@root/containers/CounterContainer";

import Step from "./Step";

export default Subscribe([CounterContainer])(Step);
