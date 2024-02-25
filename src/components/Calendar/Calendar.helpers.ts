export function getTopValue(timestamp: number) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  // hours * rems per hour * pixels per rem
  const hoursOffset = hours * 8 * 16;
  const minutesOffset = date.getMinutes() * (128 / 60);
  return hoursOffset + minutesOffset;
}

export function getHeightValue(start: number, end: number) {
  const diff = end - start;
  const minutes = Math.floor(diff / 60000);
  return minutes * (128 / 60);
}
