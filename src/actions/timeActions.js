import { ADD_TIME } from "./actionTypes";

export function addTimeAction(time, scramble) {
  return {
    type: ADD_TIME,
    time,
    scramble,
  };
}
