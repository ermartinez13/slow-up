import { NotificationsPermissionBtn } from "../components/NotificationsPermissionBtn";
import { Stopwatch } from "../components/Stopwatch";
import { TimeEntries } from "../components/TimeEntries";
import { WorkUnit } from "../components/Timer/Timer.models";
import { TotalsDisplay } from "../components/Timer/TotalsDisplay";
import { getEntryIndex, getSecondsSpentToday } from "../helpers";
import { useLocalStorage } from "../hooks/use-local-storage";
import { usePermissions } from "../hooks/use-permissions";

const INITIAL_ENTRIES: WorkUnit[] = [];

export function StopwatchPage() {
  const [entries, setEntries] = useLocalStorage<WorkUnit[]>(
    "entries",
    INITIAL_ENTRIES
  );
  const notificationsPermission = usePermissions("notifications");
  const secondsSpentToday = getSecondsSpentToday(entries);

  const addEntry = (entry: WorkUnit) => {
    setEntries(entries.concat(entry));
  };

  const updateEntry = (entry: WorkUnit) => {
    const nextEntries = window.structuredClone(entries);
    const targetIdx = getEntryIndex(entry, nextEntries);
    Object.assign(nextEntries[targetIdx], entry);
    setEntries(nextEntries);
  };

  return (
    <div>
      <section>
        {"Notification" in window && notificationsPermission === "prompt" ? (
          <NotificationsPermissionBtn />
        ) : null}
        <Stopwatch addEntry={addEntry} />
      </section>
      <section>
        <TotalsDisplay totalSeconds={secondsSpentToday} />
        <TimeEntries entries={entries} updateEntry={updateEntry} />
      </section>
    </div>
  );
}
