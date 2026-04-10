import "../css/Dashboard.css";

function Dashboard({jobs}) {
const totalApplications = jobs.length;
const acceptedCount = jobs.filter((job) => job.status === "Accepted").length;
const rejectedCount = jobs.filter((job) => job.status === "Rejected").length;
const inProgressCount = jobs.filter((job) => job.status === "In Progress").length;

const stats = [
  { title: "Total Applications", value: totalApplications },
  { title: "In Progress", value: inProgressCount },
  { title: "Rejected", value: rejectedCount },
];

  const recentApplications = [...jobs].slice(-3).reverse();

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