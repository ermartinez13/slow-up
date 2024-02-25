import {
  getTimeSpentToRender,
  getTimesToRender,
} from "../TimeEntries/TimeEntries.helpers";
import { WorkUnit } from "../Timer/Timer.models";
import { getHeightValue, getTopValue } from "./Calendar.helpers";

interface Props {
  entry: WorkUnit;
}

export function Event({ entry }: Props) {
  const top = getTopValue(entry.start);
  const height = getHeightValue(entry.start, entry.end);
  const timeSpent = getTimeSpentToRender(entry.spent);
  const times = getTimesToRender(entry.start, entry.end);
  return (
    <div className="event" style={{ top, height }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <p style={{ marginBlockStart: "0", marginBlockEnd: "0" }}>{times}</p>
        <p style={{ marginBlockStart: "0", marginBlockEnd: "0" }}>
          {timeSpent}
        </p>
      </div>
      <p>{entry.description ? entry.description : entry.text ?? ""}</p>
    </div>
  );
}
