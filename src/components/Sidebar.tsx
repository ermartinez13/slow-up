import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <div className="sidebar">
      <p>Comming Soon...</p>
      <div className="navigation">
        <span className="nav-section-label">Tools</span>
        <Link to="/tools/timer">Timer</Link>
        <Link to="/tools/stopwatch">Stopwatch</Link>
        <Link to="/tools/pomodoro">Pomodoro</Link>
        <span className="nav-section-label">Views</span>
        <Link to="#">Weekly</Link>
        <Link to="#">Monthly</Link>
      </div>
    </div>
  );
}
