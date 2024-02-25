import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { RootLayout } from "./components/RootLayout";
import { ToolsLayout } from "./components/ToolsLayout";
import { TimerPage } from "./pages/TimerPage";
import { StopwatchPage } from "./pages/StopwatchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="tools" element={<ToolsLayout />}>
            <Route path="timer" element={<TimerPage />} />
            <Route path="stopwatch" element={<StopwatchPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
