// @flow

import React, { Component, type Node } from "react";

import type { ContainerType } from "./Container";
import StateContext from "./StateContext";

export type ContainersType = Array<Class<ContainerType>>;
export type ContainerMapType = Map<Class<ContainerType>, ContainerType>;
export type MapContainersToPropsType = (...Array<ContainerType>) => Object;
export type SubscribedComponentProps = {
  children: Node
};
export type SubscribedComponentState = {};

const DUMMY_STATE = {};

export default (Containers: ContainersType, mapContainersToProps: MapContainersToPropsType) => (
  ComponentToBind: Class<Component<*, *>>
) =>
  class WithSubscription extends Component<SubscribedComponentProps, SubscribedComponentState> {
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
            return <ComponentToBind {...this.props} {...mapContainersToProps(...sharedData)} />;
          }}
        </StateContext.Consumer>
      );
    }
  };
