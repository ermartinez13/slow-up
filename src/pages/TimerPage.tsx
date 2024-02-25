import { useOutletContext } from "react-router-dom";

import { NotificationsPermissionBtn } from "../components/NotificationsPermissionBtn";
import { TimeEntries } from "../components/TimeEntries";
import { Timer } from "../components/Timer";
import { WorkUnit } from "../components/Timer/Timer.models";
import { TotalsDisplay } from "../components/Timer/TotalsDisplay";
import { getEntryIndex, getSecondsSpentToday } from "../helpers";
import { usePermissions } from "../hooks/use-permissions";
import { SetItemCallback } from "../hooks/use-local-storage";

export function TimerPage() {
  const [entries, setEntries] =
    useOutletContext<[WorkUnit[], SetItemCallback<WorkUnit[]>]>();

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
        <Timer addEntry={addEntry} />
      </section>
      <section>
        <TotalsDisplay totalSeconds={secondsSpentToday} />
        <TimeEntries entries={entries} updateEntry={updateEntry} />
      </section>
    </div>
  );
}
