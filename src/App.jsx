import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobs } from "./api/jobsApi";

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobsFromBackend = await getJobs();
        setJobs(jobsFromBackend);
      } catch (error) {
        console.error("Failed to load jobs:", error);
      }
    };

    loadJobs();
  }, []);

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
          <Route path="/" element={<Dashboard jobs={jobs} />} />
          <Route path="/jobs" element={<Jobs jobs={jobs} setJobs={setJobs} />} />
          <Route path="/analytics" element={<Analytics jobs={jobs} />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;