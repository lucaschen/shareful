import React, { Component } from "react";

export default class Step extends Component {
  componentDidMount() {
    this.inputEl.value = this.getStep();
  }

  getStep = () => this.props.step;

  handleBlur = () => {
    const newValue = this.inputEl.value;

    if (!newValue.match(/^[0-9]{1,2}$/)) {
      this.inputEl.value = this.getStep();
    }

    this.props.setStep(parseInt(this.inputEl.value));
  };

  render() {
    return <input onBlur={this.handleBlur} ref={el => (this.inputEl = el)} type="text" />;
  }
}
