import { useState } from "react";
import { TimerStatus } from "./Timer.models";

interface Props {
  secondsLeft: number;
  setTimeBudget: React.Dispatch<React.SetStateAction<number>>;
  status: TimerStatus;
}

export function TimeDisplay({ secondsLeft, setTimeBudget, status }: Props) {
  const [hours, setHours] = useState(Math.floor(secondsLeft / 3600));
  const [minutes, setMinutes] = useState(Math.floor(secondsLeft / 60) % 60);
  const [seconds, setSeconds] = useState(secondsLeft % 60);

  const updateTimeBudget = () => {
    const nextHours = hours * 3600;
    const nextMinutes = minutes * 60;
    setTimeBudget(nextHours + nextMinutes + seconds);
  };

  return (
    <div className="time-display">
      <div className="time-unit">
        <label htmlFor="hours">hr</label>
        <input
          type="number"
          name="hours"
          id="hours"
          value={hours}
          onChange={(e) => setHours(Number(e.currentTarget.value))}
          onBlur={updateTimeBudget}
          disabled={status !== TimerStatus.OFF}
        />
      </div>
      <span>:</span>
      <div className="time-unit">
        <label htmlFor="minutes">min</label>
        <input
          type="number"
          name="minutes"
          id="minutes"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.currentTarget.value))}
          onBlur={updateTimeBudget}
          disabled={status !== TimerStatus.OFF}
        />
      </div>
      <span>:</span>
      <div className="time-unit">
        <label htmlFor="seconds">sec</label>
        <input
          type="number"
          name="seconds"
          id="seconds"
          value={seconds}
          onChange={(e) => setSeconds(Number(e.currentTarget.value))}
          onBlur={updateTimeBudget}
          disabled={status !== TimerStatus.OFF}
        />
      </div>
    </div>
  );
}
