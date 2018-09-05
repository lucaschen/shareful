// @flow

import React, { Component, type ComponentType, type Node } from "react";

import getDisplayName from "./helpers/getDisplayName";
import ContainerClass, { type ContainerType } from "./Container";
import StateContext from "./StateContext";
import SubscribeBase, { type ContainersType } from "./SubscribeBase";

export type MapContainersToPropsType = (...Array<ContainerType>) => Object;

const DUMMY_STATE = {};

export class SubscribeTag extends SubscribeBase {
  render() {
    return (
      <StateContext.Consumer>
        {map => this.props.children.apply(null, this._createInstances(map, this.props.to))}
      </StateContext.Consumer>
    );
  }
}

export default (Containers: ContainersType, mapContainersToProps: MapContainersToPropsType) => {
  Containers.forEach(Container => {
    if (!Container || !Container.prototype || !(Container.prototype instanceof ContainerClass)) {
      throw new Error("Provided container is not an instance of Container!");
    }
  });

  return (ComponentToBind: ComponentType<Object>) => {
    class WithSubscription extends SubscribeBase {
      render() {
        return (
          <StateContext.Consumer>
            {map => {
              const sharedData = this._createInstances(map, Containers);
              return <ComponentToBind {...this.props} {...mapContainersToProps(...sharedData, this.props)} />;
            }}
          </StateContext.Consumer>
        );
      }
    }

    WithSubscription.displayName = `Subscribe(${getDisplayName(ComponentToBind)})`;

    return WithSubscription;
  };
};
