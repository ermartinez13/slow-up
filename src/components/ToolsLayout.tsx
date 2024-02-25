import { Outlet } from "react-router-dom";

export function ToolsLayout() {
  return (
    <div className="tools-container">
      <div className="tool-wrapper">
        <Outlet />
      </div>
      <div className="day-calendar">Calendar Coming Soon</div>
    </div>
  );
}
