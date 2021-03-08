import { ADD_TIME } from "../actions/actionTypes";

const defaultSession = {
  name: "default",
  event: "3x3",
  format: "ao5",
  rounds: [],
  roundStats: {
    ao5: NaN,
    mo5: NaN,
    ao10: NaN,
    mo10: NaN,
    ao20: NaN,
    mo20: NaN,
  },
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

function calculateRoundStats(rounds, roundStats) {
  const results = rounds.map((round) => round.average);
  const stats = {};
  for (const key in roundStats) {
    if (key.startsWith("ao")) {
      stats[key] = getAORounds(results, parseInt(key.substring(2)));
    } else if (key.startsWith("mo")) {
      stats[key] = getMORounds(results, parseInt(key.substring(2)));
    }
    // TODO: deal with no dnf
  }
  return stats;
}

function getAORounds(results, count) {
  if (results.length < count) return NaN;
  const times = results.slice(results.length - count, results.length);
  let sum = 0;
  let dnfCount = 0;
  times.forEach((x) => {
    if (x < Infinity) sum += x;
    else ++dnfCount;
  });
  if (dnfCount > 1) return Infinity;
  if (dnfCount === 1)
    return Math.round((sum - Math.min(...times)) / (count - 2));
  return Math.round(
    (sum - Math.min(...times) - Math.max(...times)) / (count - 2)
  );
}

function getMORounds(results, count) {
  if (results.length < count) return NaN;
  const times = results.slice(results.length - count, results.length);
  let sum = 0;
  times.forEach((x) => {
    sum += x;
  });
  return Math.round(sum / count);
}

function addTimeToRounds(rounds, time, scramble, format) {
  // if an average is complete
  if (
    rounds.length === 0 ||
    isRoundComplete(rounds[rounds.length - 1], format)
  ) {
    const newRound = { ...defaultRound, solves: [{ time, scramble }] };
    return [...rounds, newRound];
  } else {
    const lastRound = rounds[rounds.length - 1];
    const newLastRound = {
      ...lastRound,
      solves: [...lastRound.solves, { time, scramble }],
    };
    return [
      ...rounds.slice(0, rounds.length - 1),
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
        session.format
      );
      if (isRoundComplete(rounds[rounds.length - 1], session.format)) {
        return {
          ...session,
          rounds,
          roundStats: calculateRoundStats(rounds, session.roundStats),
        };
      }
      return { ...session, rounds };
    default:
      return session;
  }
}
