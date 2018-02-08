# Shareful ⚛️

Rethinking how component state sharing works in JavaScript.

## Concept 1: Provider(s)

Shareful needs a provider to work. You simply wrap it around some part of your app, like so:

    import { Provider } from 'shareful';

    ReactDOM.render(
      <Provider>
        <MyApp />
      </Provider>,
      ...
    );

## Concept 2: Containers

A container is essentially a collection of state. It's very much like a React Component, except without the render:

    import { Container } from 'shareful';

    class CounterContainer extends Container {
      state = { count: 0 };

      increment = () => {
        this.setState({ count: this.state.count + 1 });
      }

      decrement = () => {
        this.setState({ count: this.state.count - 1 });
      }
    }

This makes it very easy to access information in a container:

    const counter = new CounterContainer();
    counter.state.count; // 0
    counter.increment();
    counter.state.count; // 1
    counter.decrement();
    counter.state.count; // 0

## Concept 3: mapContainersToProps

The contents of the containers are then mapped to the props of a component, like so:

    import { Component } from 'react';
    import { Subscribe } from 'shareful';

    import CounterContainer from './CounterContainer';

    class CounterDisplay extends Component {
      render() {
        return (
          <div>
            <h1>Count: {this.props.count}</h1>
            <button onClick={this.props.increment}>+1</button>
          </div>
        );
      }
    }

    // each parameter reflects an instance of a container that has been subscribed to
    const mapContainersToProps = counter => ({
      count: counter.state.count,
      increment: counter.increment
    });

    export default Subscribe([CounterContainer], mapContainersToProps)(CounterDisplay);

## Inspiration

Strongly inspired by Unstated ([https://github.com/thejameskyle/unstated](https://github.com/thejameskyle/unstated))
