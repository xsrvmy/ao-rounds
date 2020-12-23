import {
  LOAD_SCRAMBLES,
  NEXT_SCRAMBLE,
  PREVIOUS_SCRAMBLE,
} from "../actions/actionTypes";

const defaultScrambles = {
  queue: [],
  previous: null,
};

export default function scrambleReducer(scrambles = defaultScrambles, action) {
  switch (action.type) {
    case LOAD_SCRAMBLES:
      return {
        ...scrambles,
        queue: [...scrambles.queue, ...action.scrambles],
      };
    case NEXT_SCRAMBLE:
      const [head, ...tail] = scrambles.queue;
      return {
        ...scrambles,
        queue: tail,
        previous: head,
      };
    case PREVIOUS_SCRAMBLE:
      return {
        ...scrambles,
        queue: [scrambles.previous, ...scrambles.queue],
        previous: null,
      };
    default:
      return scrambles;
  }
}
