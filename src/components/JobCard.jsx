function JobCard({ job, onDelete, onEdit }) {
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
      </div>

      <div className="job-actions">
        <button className="edit-button" onClick={() => onEdit(job)}>
            Edit
        </button>
        <button className="delete-button" onClick={() => onDelete(job.id)}>
            Delete
        </button>      
        </div>
    </div>
  );
}

export default JobCard;