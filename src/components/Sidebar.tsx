import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <div className="sidebar">
      <p>Comming Soon...</p>
      <div className="navigation">
        <span>Tools</span>
        <Link to="/tools/timer">Timer</Link>
        <Link to="/tools/stopwatch">Stopwatch</Link>
      </div>
    </div>
  );
}
