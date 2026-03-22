import "../css/Dashboard.css";

function Dashboard() {
  const stats = [
    { title: "Total Applications", value: 25 },
    { title: "Moving on to next steps", value: 10 },
    { title: "Rejected", value: 5 },
  ];

  const recentApplications = [
    { id: 1, company: "Google", role: "Front End Developer", status: "Accepted" },
    { id: 2, company: "American Eagle", role: "UI/UX Designer", status: "Rejected" },
    { id: 3, company: "UIC", role: "Entry Level Front End Developer", status: "In Progress" },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Track your applications and monitor your progress.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <h3>{stat.title}</h3>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="recent-section">
        <h2>Recent Applications</h2>

        <div className="recent-list">
          {recentApplications.map((job) => (
            <div className="recent-card" key={job.id}>
              <h3>{job.company}</h3>
              <p>{job.role}</p>
              <span className={`status-badge ${job.status.toLowerCase().replace(/\s+/g, "-")}`}>
                {job.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;