import React from "react";
import { centiToDisplayTime } from "../../timeUtils";

export default class TimeInput extends React.Component {
  state = { text: "", error: false };

  getTimeValue = () => {
    if (this.state.text.match(/^[0-9]+$/)) {
      const value = parseInt(this.state.text, 10);
      const centiseconds = value % 10000;
      const minutes = Math.floor(value / 10000);
      if (centiseconds === 0 && minutes === 0) return undefined;
      return centiseconds + minutes * 6000;
    }
    // xx.xx
    if (
      this.state.text.match(/^[0-9]*\.[0-9]*$/) &&
      this.state.text.length > 1
    ) {
      const output = Math.floor(parseFloat(this.state.text) * 100);
      if (output === 0) return undefined;
      return output;
    }
    // xx:xx
    const matchResults = this.state.text.match(/^([0-9]*):([0-9]*\.?[0-9]*)$/);
    console.log(matchResults);
    if (matchResults) {
      const minutes = parseInt(matchResults[1] || "0", 10);
      const centiseconds = Math.floor(parseFloat(matchResults[2] || "0") * 100);
      const output = minutes * 6000 + centiseconds;
      if (output === 0) return undefined;
      return output;
    }
  };

  // TODO: hook this up to redux
  submitTime = (centi) => {
    alert(centiToDisplayTime(centi));
    this.setState({ error: false, text: "" });
  };

  onChange = (e) => {
    console.log("onChange");
    this.setState({ text: e.target.value });
  };

  /**
   * @param {React.KeyboardEvent<>} e
   */
  onKeyDown = (e) => {
    if (e.key === "Enter") {
      // validation
      const value = this.getTimeValue();
      if (value) {
        this.submitTime(value);
      } else {
        this.setState({ error: true });
      }
    }
  };

  render() {
    return (
      <input
        type="text"
        className={`form-control form-control-lg ${
          this.state.error ? "is-invalid" : ""
        }`}
        value={this.state.text}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
      />
    );
  }
}
