import { Outlet } from "react-router-dom";

import { Calendar } from "./Calendar";
import { useLocalStorage } from "../hooks/use-local-storage";
import { WorkUnit } from "./Timer/Timer.models";
import { INITIAL_ENTRIES } from "./Timer/Timer.constants";

export function ToolsLayout() {
  const [entries, setEntries] = useLocalStorage<WorkUnit[]>(
    "entries",
    INITIAL_ENTRIES
  );

  return (
    <div className="tools-container">
      <div className="tool-wrapper">
        <Outlet context={[entries, setEntries]} />
      </div>
      <Calendar entries={entries} />
    </div>
  );
}
