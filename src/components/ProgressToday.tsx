import { getSecondsSpentToday } from "../helpers";
import { WorkUnit } from "./Timer/Timer.models";
import { TotalsDisplay } from "./Timer/TotalsDisplay";

interface Props {
  entries: WorkUnit[];
}

export function ProgressToday({ entries }: Props) {
  const secondsSpentToday = getSecondsSpentToday(entries);
  return (
    <div className="day-progress">
      <span>spent: </span>
      <TotalsDisplay totalSeconds={secondsSpentToday} />
      <span style={{ padding: "20px" }}>/</span>
      <span>budget: 5 hrs 30 min</span>
    </div>
  );
}
