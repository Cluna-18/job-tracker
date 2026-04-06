import "../css/Jobs.css"
import JobCard from "../components/JobCard";

function Jobs(){
     /*const jobs = [
    { id: 1, company: "Google", role: "Front End Developer", status: "Accepted" },
    { id: 2, company: "American Eagle", role: "UI/UX Designer", status: "Rejected" },
    { id: 3, company: "UIC", role: "Entry Level Front End Developer", status: "In Progress" },
  ];*/

  const handleDelete = (id) => {
  setJobs(jobs.filter((job) => job.id !== id));
};

  const [jobs, setJobs] = useState([]);
    return(
        <div className="jobs-page">
            <div className="jobs-header">
            <h1>Applications</h1>
            <p>Monitor your applications</p>
            </div>
            <div className="add-job">
                <button className="add-job-button">+ Add Job</button>
            </div>

            <div className="jobs-list">
                {jobs.map((job) => (
                <JobCard key={job.id} job={job} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    )
}
export default Jobs;