import "../css/Analytics.css";


function Analytics({ jobs}){
  const totalApplications = jobs.length;
  const acceptedCount = jobs.filter((job) => job.status === "Accepted").length;
  const rejectedCount = jobs.filter((job) => job.status === "Rejected").length;
  const inProgressCount = jobs.filter((job) => job.status === "In Progress").length;
  const appliedCount = jobs.filter((job) => job.status === "Applied").length;
  const interviewCount = jobs.filter((job) => job.status === "Interview").length;

  //Rates percentage calculations
  const acceptanceRate =
  totalApplications > 0 ? ((acceptedCount / totalApplications) * 100).toFixed(1) : 0;
  const rejectionRate =
  totalApplications > 0 ? ((rejectedCount / totalApplications) * 100).toFixed(1) : 0;
  const inProgressRate =
  totalApplications > 0 ? ((inProgressCount / totalApplications) * 100).toFixed(1) : 0;
  const appliedRate =
  totalApplications > 0 ? ((appliedCount / totalApplications) * 100).toFixed(1) : 0;
  const interviewRate =
  totalApplications > 0 ? ((interviewCount / totalApplications) * 100).toFixed(1) : 0;

   const stats = [
    { title: "Total Applications", value: totalApplications },
    { title: "In Progress", value: inProgressCount },
    { title: "Rejected", value: rejectedCount },
    { title: "Applied", value: appliedCount },
    { title: "Interview", value: interviewCount },
  ];

  const rates = [
    { title: "Acceptance Rate", value: `${acceptanceRate}%` },
    { title: "Rejection Rate", value: `${rejectionRate}%` },
    { title: "In Progress Rate", value: `${inProgressRate}%` },
    { title: "Applied Rate", value: `${appliedRate}%` },
    { title: "Interview Rate", value: `${interviewRate}%` },
  ];

    return(
        <div className = "analytics-page">
            <div className="analytics-header">
                <h1>Analytics</h1>
                <p>View how you are doing</p>
            </div>
            <div className="stats-grid">
                {stats.map((stat, index) => (
                <div className="stat-card" key={index}>
                    <h3>{stat.title}</h3>
                    <p>{stat.value}</p>
                </div>
                ))}
            </div>
            <hr style={{ border: "none", borderTop: "2px solid black", width: "100%" }} />       
            <div className ="rates-section">
                <h2>Application Status Distribution</h2>
                <div className="chart-placeholder">
                    <div className="rates-grid">
                        {rates.map((stat, index) => (
                        <div className="rates-card" key={index}>
                            <h3>{stat.title}</h3>
                            <p>{stat.value}</p>
                        </div>))}
                    </div>
                </div>
            </div>
            <div className = "graphs-section">
                <p>Graph Placeholder</p>
            </div>
        
        
        </div>
    )
}
export default Analytics;