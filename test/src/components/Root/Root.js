// @flow

import React, { Component } from "react";
import { Provider } from "shareful";

import CounterWrapper from "./CounterWrapper";

type State = {
  providerOn: boolean
};

export default class Root extends Component<{}, State> {
  state = {
    providerOn: true
  };

  toggleProvider = () => this.setState({ providerOn: !this.state.providerOn });

  render() {
    return (
      <div>
        {this.state.providerOn && (
          <Provider>
            <CounterWrapper />
          </Provider>
        )}
        {this.state.providerOn && (
          <Provider>
            <CounterWrapper />
          </Provider>
        )}
        <button onClick={this.toggleProvider} style={{ fontSize: 40, marginTop: 40 }}>
          TOGGLE THE PROVIDER
        </button>
      </div>
    );
  }
}
