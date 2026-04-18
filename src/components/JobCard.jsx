
function JobCard({ job, onDelete, onEdit }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const formRef = useRef(null);

  return (
    <div className="job-card">
      <div className="job-card-content">
        <h3>{job.company}</h3>
        <p>Role: {job.role}</p>

        <span
          className={`status-badge ${job.status
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          {job.status}
        </span>

        {job.notes?.trim() && (
          <p className="notes">Notes: {job.notes}</p>
        )}

        <p className="notes">
          Reached Out? {" "}
          {job.reachedOut === "reached"
            ? "Yes"
            : job.reachedOut === "not-reached"
            ? "No"
            : ""}
        </p>

        {job.link?.trim() && (
          <p>
            Link:{" "}
            <a
              href={job.link.startsWith("http") ? job.link : `https://${job.link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Job
            </a>
          </p>
        )}

        <p className="job-date">Applied: {formatDate(job.dateApplied)}</p>

      </div>

      <div className="job-actions">
        <button className="edit-button" onClick={() => onEdit(job)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => onDelete(job.jobId)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default JobCard;