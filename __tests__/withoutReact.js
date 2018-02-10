import { Container } from "../src/shareful";

class TestContainer extends Container {
  state = { a: 1, b: 2 };

  updateA = () => {
    this.setState({ a: 2 });
  };

  updateB = () => {
    this.setState({ b: 3 });
  };
}

test("Container", () => {
  const newInstance = new TestContainer();

  expect(newInstance.state).toEqual({ a: 1, b: 2 });

  newInstance.updateA();

  expect(newInstance.state).toEqual({ a: 2, b: 2 });

  newInstance.updateB();

  expect(newInstance.state).toEqual({ a: 2, b: 3 });
});
