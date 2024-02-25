import React from "react";

import { ActionButtons } from "./ActionButtons";
import { TimeDisplay } from "./TimeDisplay";
import { notify } from "../../helpers";
import {
  PartialEntry,
  TimerEvents,
  TimerStatus,
  WorkUnit,
} from "./Timer.models";
import { DEFAULT_ENTRY, DEFAULT_TIME } from "./Timer.constants";
import { useTick } from "../../hooks/use-tick";

interface Props {
  addEntry: (timeEntry: WorkUnit) => void;
  setPartialEntry: React.Dispatch<React.SetStateAction<PartialEntry>>;
  partialEntry: PartialEntry;
}

export function Timer({ addEntry, setPartialEntry, partialEntry }: Props) {
  const [status, setStatus] = React.useState<TimerStatus>(TimerStatus.OFF);
  const { ticks: timeSpent, workerRef, resetTicks } = useTick();
  const [timeBudget, setTimeBudget] = React.useState(DEFAULT_TIME);
  const secondsLeft = timeBudget - timeSpent;

  const start = () => {
    if (status === TimerStatus.ON) return;
    workerRef.current?.postMessage({ type: TimerEvents.START });
    setStatus(TimerStatus.ON);
    if (partialEntry.start === -1) {
      setPartialEntry({
        ...partialEntry,
        start: Date.now(),
      });
    }
  };

  const stop = () => {
    if (status === TimerStatus.OFF) return;
    setStatus(TimerStatus.OFF);
    workerRef.current?.postMessage({ type: TimerEvents.STOP });
    notify();
    resetTicks();
    const timeEntry: WorkUnit = {
      ...partialEntry,
      end: Date.now(),
      spent: timeSpent,
    };
    setPartialEntry({ ...DEFAULT_ENTRY });
    addEntry(timeEntry);
  };

  const pause = () => {
    if (status === TimerStatus.PAUSED) return;
    workerRef.current?.postMessage({ type: TimerEvents.PAUSE });
    setStatus(TimerStatus.PAUSED);
  };

  if (timeSpent >= timeBudget && status !== "off") {
    stop();
  }

  return (
    <div className="timer">
      <TimeDisplay
        secondsLeft={secondsLeft}
        setTimeBudget={setTimeBudget}
        key={secondsLeft}
        status={status}
      />
      <ActionButtons start={start} pause={pause} stop={stop} status={status} />
    </div>
  );
}
