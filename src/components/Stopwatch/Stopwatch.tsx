import React from "react";

import {
  PartialEntry,
  TimerEvents,
  TimerStatus,
  WorkUnit,
} from "../Timer/Timer.models";
import { DEFAULT_ENTRY } from "../Timer/Timer.constants";
import { notify } from "../../helpers";
import { ActionButtons } from "../Timer/ActionButtons";
import { useTick } from "../../hooks/use-tick";

interface Props {
  addEntry: (timeEntry: WorkUnit) => void;
  setPartialEntry: React.Dispatch<React.SetStateAction<PartialEntry>>;
  partialEntry: PartialEntry;
}

export function Stopwatch({ addEntry, setPartialEntry, partialEntry }: Props) {
  const [status, setStatus] = React.useState<TimerStatus>(TimerStatus.OFF);
  const { ticks: timeSpent, workerRef, resetTicks } = useTick();
  const hours = Math.floor(timeSpent / 3600);
  const minutes = Math.floor(timeSpent / 60) % 60;
  const seconds = timeSpent % 60;

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
  return (
    <div className="timer">
      <div>
        <span>{hours}</span>
        <span>:</span>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <ActionButtons start={start} pause={pause} stop={stop} status={status} />
    </div>
  );
}
