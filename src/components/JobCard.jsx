function JobCard({ job, onDelete, onEdit }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="job-card">
      <div className="job-card-content">
        <h3>{job.company}</h3>
        <p>{job.role}</p>

        <span
          className={`status-badge ${job.status
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          {job.status}
        </span>

        <p className="notes">{job.notes}</p>
        <p className="notes">{job.reachedOut}</p>
        <p className="notes">{job.link}</p>
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