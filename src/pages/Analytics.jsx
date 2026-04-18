import "../css/Analytics.css";


function Analytics({ jobs}){
  const totalApplications = jobs.length;
  const acceptedCount = jobs.filter((job) => job.status === "Accepted").length;
  const rejectedCount = jobs.filter((job) => job.status === "Rejected").length;
  const inProgressCount = jobs.filter((job) => job.status === "In Progress").length;
  const appliedCount = jobs.filter((job) => job.status === "Applied").length;
  const interviewCount = jobs.filter((job) => job.status === "Interview").length;

   const stats = [
    { title: "Total Applications", value: totalApplications },
    { title: "In Progress", value: inProgressCount },
    { title: "Rejected", value: rejectedCount },
    { title: "Applied", value: appliedCount },
    { title: "Interview", value: interviewCount },
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
        </div>
    )
}
export default Analytics;