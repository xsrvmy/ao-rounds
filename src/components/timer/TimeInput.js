import React, { useState } from "react";
import { addTimeAction } from "../../actions/timeActions";
import { useDispatch, useSelector } from "react-redux";
import { nextScrambleAction } from "../../actions/scramblesActions";

export default function TimeInput() {

  const [timeText, setTimeText] = useState("");
  const [isTimeInvalid, setTimeInvalid] = useState(false);
  const currentScramble = useSelector((state) => state.scrambles.queue[0]);
  const dispatch = useDispatch();

  const getTimeValue = () => {
    if (timeText.match(/^[0-9]+$/)) {
      const value = parseInt(timeText, 10);
      const centiseconds = value % 10000;
      const minutes = Math.floor(value / 10000);
      if (centiseconds === 0 && minutes === 0) return undefined;
      return centiseconds + minutes * 6000;
    }
    // xx.xx
    if (
      timeText.match(/^[0-9]*\.[0-9]*$/) &&
      timeText.length > 1
    ) {
      const output = Math.floor(parseFloat(timeText) * 100);
      if (output === 0) return undefined;
      return output;
    }
    // xx:xx
    const matchResults = timeText.match(/^([0-9]*):([0-9]*\.?[0-9]*)$/);
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
  const submitTime = (centi) => {
    dispatch(addTimeAction(centi, currentScramble || ""));
    dispatch(nextScrambleAction());
    setTimeText("");
    setTimeInvalid(false);
  };

  const onChange = (e) => {
    setTimeText(e.target.value);
  };

  /**
   * @param {React.KeyboardEvent<>} e
   */
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      // validation
      const value = getTimeValue();
      if (value) {
        submitTime(value);
      } else {
        setTimeInvalid(true);
      }
    }
  };

  return (
    <input
      type="text"
      className={`form-control form-control-lg ${
        isTimeInvalid ? "is-invalid" : ""
      }`}
      value={timeText}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}
