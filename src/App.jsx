import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "30px",
          backgroundColor: "#f8fafc",
          overflowY: "auto",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;