import { FilterMode } from "./TimeEntries.constants";

export function getFormattedDate(timestamp: number) {
  const date = new Date(timestamp);
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  return `${month} / ${day}`;
}

export function getFormattedTime(timestamp: number) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const formattedHours = (hours <= 12 ? hours : hours % 12).toString();
  const formattedMinutes = date.getMinutes().toString().padStart(2, "0");
  const amPm = hours >= 12 ? "pm" : "am";
  return `${formattedHours}:${formattedMinutes}${amPm}`;
}

export function getDatesToRender(startTimestamp: number, endTimestamp: number) {
  const dateStart = getFormattedDate(startTimestamp);
  const dateEnd = getFormattedDate(endTimestamp);
  const isSameDate = dateStart === dateEnd;
  return `${dateStart}${isSameDate ? "" : ` - ${dateEnd}`}`;
}

export function getTimesToRender(startTimestamp: number, endTimestamp: number) {
  const timeStart = getFormattedTime(startTimestamp);
  const timeEnd = getFormattedTime(endTimestamp);
  const isSameTime = timeStart === timeEnd;
  return `${timeStart}${isSameTime ? "" : ` - ${timeEnd}`}`;
}

export function isFilterMode(value: string): value is FilterMode {
  return Object.values(FilterMode).some((mode) => mode === value);
}
