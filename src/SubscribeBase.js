// @flow

import React, { Component } from "react";

import ContainerClass, { type ContainerType } from "./Container";

export type ContainersType = Array<Class<ContainerType>>;
export type ContainerMapType = Map<Class<ContainerType>, ContainerType>;
export type SubscribedComponentProps = {
  children: Node | Function
};
export type SubscribedComponentState = {};

const DUMMY_STATE = {};

export default class SubscribeBase extends Component<SubscribedComponentProps, SubscribedComponentState> {
  state = {};
  instances: Array<ContainerType> = [];
  unmounted = false;

  componentWillUnmount() {
    this.unmounted = true;
    this._unsubscribe();
  }

  _unsubscribe() {
    this.instances.forEach(container => {
      container.unsubscribe(this.onUpdate);
    });
  }

  onUpdate = () => {
    if (!this.unmounted) {
      this.setState(DUMMY_STATE);
    }
  };

  _createInstances(map: ContainerMapType | null, containers: ContainersType): Array<ContainerType> {
    if (map === null) {
      throw new Error("You must wrap your <Subscribe> components with a <Provider>");
    }

    let safeMap = map;
    let instances = containers.map(Container => {
      if (!Container || !Container.prototype || !(Container.prototype instanceof ContainerClass)) {
        throw new Error("Provided container is not an instance of Container!");
      }
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
}
