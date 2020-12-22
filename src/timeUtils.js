/**
 *
 * @param {Number} x
 */
export function centiToDisplayTime(x) {
  if (x === Infinity) return "DNF";
  if (x === -Infinity) return "DNS";

  if (x < 0) throw new Error();

  const decimals = x % 100;
  const seconds = Math.floor(x / 100) % 60;
  const minutes = Math.floor(x / 6000);
  const decimalString = decimals < 10 ? "0" + decimals : decimals.toString();

  if (minutes === 0) {
    return `${seconds}.${decimalString}`;
  }

  const secondString = seconds < 10 ? "0" + seconds : seconds.toString();
  return `${minutes}:${secondString}.${decimalString}`;
}
