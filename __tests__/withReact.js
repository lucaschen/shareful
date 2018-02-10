import Enzyme, { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React, { Component } from "react";
import { Container, Provider, Subscribe } from "shareful";

class CounterContainer extends Container {
  state = { count: 0, step: 1 };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  setStep = step => {
    this.setState({ step });
  };
}

const Root = () => (
  <Provider>
    <Counter />
  </Provider>
);

const _Counter = ({ count, decrement, increment, setStep }) => (
  <div>
    <button data-decrement onClick={decrement}>
      -{count}
    </button>
    <span data-count>{count}</span>
    <button data-increment onClick={increment}>
      +{count}
    </button>
    <button data-set-step onClick={() => setStep(5)}>
      Set step to 5
    </button>
  </div>
);

const mapContainersToProps = ({ decrement, increment, setStep, state: { count } }) => ({
  count,
  decrement,
  increment,
  setStep
});

const Counter = Subscribe([CounterContainer], mapContainersToProps)(_Counter);

Enzyme.configure({ adapter: new Adapter() });

test("Provider", () => {
  const counter = new CounterContainer();
  const tree = mount(
    <Provider inject={[counter]}>
      <Counter />
    </Provider>
  );

  expect(counter.state.step).toBe(1);

  tree.find("[data-increment]").simulate("click");
  expect(counter.state.count).toBe(1);

  tree.find("[data-decrement]").simulate("click");
  expect(counter.state.count).toBe(0);

  tree.find("[data-set-step]").simulate("click");
  expect(counter.state.step).toBe(5);
});
