// @flow

import React, { Component, type Node } from "react";
import createReactContext from "create-react-context";
import PropTypes from "prop-types";

const StateContext = createReactContext(null);

// TYPE EXPORTS

export type ContainerType = Container<Object>;
export type ContainersType = Array<Class<ContainerType>>;
export type ContainerMapType = Map<Class<ContainerType>, ContainerType>;
export type SubscribedComponentProps = {
  children: Node
};
export type SubscribedComponentState = {};

export type ProviderProps = {
  inject?: Array<ContainerType>,
  children: Node
};

export class Container<State: {}> {
  state: State;
  _listeners: Array<() => mixed>;

  constructor() {
    this._listeners = [];
  }

  setState(state: $Shape<State>) {
    this.state = {
      ...this.state,
      ...state
    };
    this._listeners.forEach(fn => fn());
  }

  subscribe(fn: Function) {
    this._listeners.push(fn);
  }

  unsubscribe(fn: Function) {
    this._listeners = this._listeners.filter(f => f !== fn);
  }
}

const DUMMY_STATE = {};

export const Subscribe = (Containers: ContainersType) => (ComponentToBind: React.Component<*, *>) =>
  class WithSubscription extends Component<SubscribedComponentProps, SubscribedComponentState> {
    static propTypes = {
      children: PropTypes.func.isRequired
    };

    state = {};
    instances: Array<ContainerType> = [];

    componentWillReceiveProps() {
      this._unsubscribe();
    }

    componentWillUnmount() {
      this._unsubscribe();
    }

    _unsubscribe() {
      this.instances.forEach(container => {
        container.unsubscribe(this.onUpdate);
      });
    }

    onUpdate = () => {
      this.setState(DUMMY_STATE);
    };

    _createInstances(map: ContainerMapType | null, containers: ContainersType): Array<ContainerType> {
      if (map === null) {
        throw new Error("You must wrap your <Subscribe> components with a <Provider>");
      }

      let safeMap = map;
      let instances = containers.map(Container => {
        let instance = safeMap.get(Container);

        if (!instance) {
          instance = new Container();
          safeMap.set(Container, instance);
        }

        instance.unsubscribe(this.onUpdate);
        instance.subscribe(this.onUpdate);

        return instance;
      });

      this.instances = instances;
      return instances;
    }

    render() {
      return (
        <StateContext.Consumer>
          {map => {
            const sharedData = this._createInstances(map, Containers);
            return <ComponentToBind {...this.props} shared={sharedData} />;
          }}
        </StateContext.Consumer>
      );
    }
  };

export function Provider({ inject, children }: ProviderProps) {
  return (
    <StateContext.Consumer>
      {parentMap => {
        // propagates parent context down to nested children <Provider> components
        let childMap = new Map(parentMap);

        if (inject) {
          inject.forEach(instance => {
            childMap.set(instance.constructor, instance);
          });
        }

        return <StateContext.Provider value={childMap}>{children}</StateContext.Provider>;
      }}
    </StateContext.Consumer>
  );
}
