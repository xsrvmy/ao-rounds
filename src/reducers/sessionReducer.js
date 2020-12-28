import { ADD_TIME } from "../actions/actionTypes";

const defaultSession = {
  name: "default",
  event: "3x3",
  format: "ao5",
  rounds: [],
};

const defaultRound = {
  average: NaN,
  solves: [],
};

function isRoundComplete(round, format) {
  if (format === "ao5") return round.solves.length === 5;
  return round.solves.length === 3;
}

function calculateRoundAverage(round, format) {
  if (!isRoundComplete(round, format)) return NaN;
  const times = round.solves.map((x) => Math.abs(x.time));
  switch (format) {
    case "ao5":
      const filtered = times.filter((x) => x !== Infinity);
      if (filtered.length < 4) return Infinity;
      if (filtered.length === 4)
        return Math.round(
          (filtered[0] +
            filtered[1] +
            filtered[2] +
            filtered[3] -
            Math.min(...filtered)) /
            3
        );
      return Math.round(
        (times[0] +
          times[1] +
          times[2] +
          times[3] +
          times[4] -
          Math.min(...times) -
          Math.max(...times)) /
          3
      );
    case "mo3":
      return Math.round((times[0] + times[1] + times[2]) / 3);
    case "bo3":
      return Math.min(times[0], times[1], times[2]);
    default:
      return NaN;
  }
}

function addTimeToRounds(rounds, time, scramble, format) {
  // if an average is complete
  if (rounds.length === 0 || isRoundComplete(rounds[rounds.length - 1], format)) {
    const newRound = { ...defaultRound, solves: [{ time, scramble }] };
    return [...rounds, newRound];
  } else {
    const lastRound = rounds[rounds.length - 1];
    const newLastRound = {
      ...lastRound,
      solves: [...lastRound.solves, { time, scramble }],
    };
    return [
      ...(rounds.slice(0, rounds.length - 1)),
      { ...newLastRound, average: calculateRoundAverage(newLastRound, format) },
    ];
  }
}

export default function sessionReducer(session = defaultSession, action) {
  switch (action.type) {
    case ADD_TIME:
      const rounds = addTimeToRounds(
        session.rounds,
        action.time,
        action.scramble,
        session.format,
      );
      return { ...session, rounds };
    default:
      return session;
  }
}
