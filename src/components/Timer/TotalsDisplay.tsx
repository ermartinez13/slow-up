import { millisecondsToTimeBreakdown } from "../../helpers/time.helpers";

export function TotalsDisplay({
  totalMilliseconds,
}: {
  totalMilliseconds: number;
}) {
  const timeBreakdown = millisecondsToTimeBreakdown(totalMilliseconds);
  return (
    <span>
      {timeBreakdown.hours} hrs &nbsp;{timeBreakdown.minutes} min &nbsp;
      {timeBreakdown.seconds} s
    </span>
  );
}
