import { useEffect, useRef } from "react";
import { findTodaysEarliestEntryIdx } from "../../helpers";
import { range } from "../../utils";
import { WorkUnit } from "../Timer/Timer.models";
import { Event } from "./Event";

interface Props {
  entries: WorkUnit[];
}

export function Calendar({ entries }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const idx = findTodaysEarliestEntryIdx(entries);
  const todaysEntries = entries.slice(idx).reverse();

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const hour = Math.max(new Date().getHours() - 1, 0);
    const hoursOffset = hour * 8 * 16;
    el.scrollTo({ top: hoursOffset, behavior: "smooth", left: 0 });
  }, []);

  return (
    <div className="day-calendar" ref={ref}>
      <div className="events">
        {todaysEntries.map((entry) => {
          return <Event entry={entry} key={entry.start} />;
        })}
      </div>
      <div className="hours">
        {range(0, 23).map((hour) => {
          return (
            <div key={hour} className="hour">
              {hour}
            </div>
          );
        })}
      </div>
    </div>
  );
}
