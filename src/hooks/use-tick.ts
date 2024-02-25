import React from "react";
import { TimerEvents } from "../components/Timer/Timer.models";

// NOTE: could receive length of tick as argument as well as initial state value
export function useTick() {
  const [ticks, setTicks] = React.useState(0);
  const workerRef = React.useRef<Worker | null>(null);

  React.useEffect(() => {
    const worker = new Worker(new URL("../workers/clock.ts", import.meta.url), {
      type: "module",
    });
    workerRef.current = worker;

    const tick = () => setTicks((prev) => prev + 1);

    worker.onmessage = ({ data }) => {
      if (data.type === TimerEvents.TICK) tick();
    };

    return () => {
      worker.terminate();
    };
  }, []);

  const resetTicks = () => setTicks(0);

  return { ticks, workerRef, resetTicks };
}
