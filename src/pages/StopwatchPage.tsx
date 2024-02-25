import { useOutletContext } from "react-router-dom";

import { Stopwatch } from "../components/Stopwatch";
import { PartialEntry, WorkUnit } from "../components/Timer/Timer.models";
import { SetItemCallback } from "../hooks/use-local-storage";
import { DEFAULT_ENTRY } from "../components/Timer/Timer.constants";
import React from "react";
import { ControlledTextArea } from "../components/ControlledTextArea";

export function StopwatchPage() {
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
    <div>
      <Stopwatch
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
