import { Subscribe } from "shareful";

import CounterContainer from "@root/containers/CounterContainer";

import Counter from "./Counter";

export default Subscribe([CounterContainer])(Counter);
