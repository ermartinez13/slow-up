import { useOutletContext } from "react-router-dom";
import React from "react";

import { Timer } from "../components/Timer";
import { PartialEntry, WorkUnit } from "../components/Timer/Timer.models";
import { SetItemCallback } from "../hooks/use-local-storage";
import { ControlledTextArea } from "../components/ControlledTextArea";
import { DEFAULT_ENTRY } from "../components/Timer/Timer.constants";
import { ProgressToday } from "../components/ProgressToday";

export function TimerPage() {
  const [entries, setEntries] =
    useOutletContext<[WorkUnit[], SetItemCallback<WorkUnit[]>]>();
  const [partialEntry, setPartialEntry] = React.useState<PartialEntry>({
    ...DEFAULT_ENTRY,
  });

  const addEntry = (entry: WorkUnit) => {
    setEntries(entries.concat(entry));
  };

  const setContent = (content: string) => {
    setPartialEntry((prev) => ({
      ...prev,
      description: content,
    }));
  };

  return (
    <div className="page">
      <ProgressToday entries={entries} />
      <Timer
        addEntry={addEntry}
        setPartialEntry={setPartialEntry}
        partialEntry={partialEntry}
      />
      <ControlledTextArea
        content={partialEntry.description}
        setContent={setContent}
        key={partialEntry.description}
      />
    </div>
  );
}
