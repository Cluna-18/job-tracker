import "../css/Jobs.css"

function Jobs(){
     const jobs = [
    { id: 1, company: "Google", role: "Front End Developer", status: "Accepted" },
    { id: 2, company: "American Eagle", role: "UI/UX Designer", status: "Rejected" },
    { id: 3, company: "UIC", role: "Entry Level Front End Developer", status: "In Progress" },
  ];
    return(
        <div className="jobs-page">
            <div className="jobs-header">
            <h1>Jobs</h1>
            <p> Monitor your applications</p>
            </div>
            <div className="add-job">
                <button className="add-job-button">+ Add Job</button>
            </div>

            <div className="jobs-list">
                {jobs.map((job) => (
                    <div className="job-card" key={job.id}>
                    <h3>{job.company}</h3>
                    <p>{job.role}</p>
                    <span className={`status-badge ${job.status.toLowerCase().replace(/\s+/g, "-")}`}>
                    {job.status}
                    </span>
                    <button className="edit-button">Edit</button>
                    <button className="delete-button">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Jobs;