import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

    const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

function App() {

    const [jobs, setJobs] = useState([
      { id: 1, company: "Google", role: "Front End Developer", status: "Accepted", notes: "Applied on linkedIn", dateApplied: getTodayDate() },
      { id: 2, company: "American Eagle", role: "UI/UX Designer", status: "Rejected", notes: "Did not meet requirements", dateApplied: getTodayDate() },
      { id: 3, company: "UIC", role: "Entry Level Front End Developer", status: "In Progress", notes: "Awaiting response", dateApplied: getTodayDate() },
      { id: 4, company: "Best Buy", role: "Front End Developer", status: "In Progress", notes: "Awaiting response", dateApplied: getTodayDate() },

    ]);

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
          <Route path="/jobs" element={<Jobs jobs={jobs} setJobs={setJobs}/>} />
          <Route path="/analytics" element={<Analytics jobs={jobs}/>} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;