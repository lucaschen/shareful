import React from "react";
import { render } from "react-dom";
import { Provider } from "shareful";

import Root from "@root/components/Root";

render(
  <Provider>
    <Root />
  </Provider>,
  document.getElementById("reactRoot")
);
