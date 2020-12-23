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
      if (scrambles.queue.length > 0) {
        const [head, ...tail] = scrambles.queue;
        return {
          ...scrambles,
          queue: tail,
          previous: head,
        };
      }
      return scrambles;
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
