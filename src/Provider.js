// @flow

import React from "react";

import type { ContainerType } from "./Container";
import StateContext from "./StateContext";

export type ProviderProps = {
  children?: Node,
  inject?: Array<ContainerType>
};

export default ({ children, inject }: ProviderProps) => (
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
