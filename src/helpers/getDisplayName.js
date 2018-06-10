// @flow

import type { ComponentType } from "react";

const getDisplayName = (Component: ComponentType<Object>) => {
  if (typeof Component === "string") {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || "Component";
};

export default getDisplayName;
