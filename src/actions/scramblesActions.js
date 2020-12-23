import {
  LOAD_SCRAMBLES,
  NEXT_SCRAMBLE,
  PREVIOUS_SCRAMBLE,
} from "./actionTypes";

export function loadScramblesAction(scrambles) {
  return {
    type: LOAD_SCRAMBLES,
    scrambles,
  };
}

export function nextScrambleAction() {
  return {
    type: NEXT_SCRAMBLE,
  };
}

export function previousScrambleAction() {
  return {
    type: PREVIOUS_SCRAMBLE,
  };
}
