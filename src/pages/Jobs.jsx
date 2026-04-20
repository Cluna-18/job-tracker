import "../css/Jobs.css";
import JobCard from "../components/JobCard";
import { createJob } from "../api/jobsApi";
import { deleteJob } from "../api/jobsApi";
import confirmDelete from "../components/confirmDelete";
import { updateJob } from "../api/jobsApi";
import { useState, useRef } from "react";

function Jobs({ jobs, setJobs }) {
  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const handleDelete = async (jobId) => {
  try {
    await deleteJob(jobId);

    setJobs((prevJobs) =>
      prevJobs.filter((job) => job.jobId !== jobId)
    );
  } catch (error) {
    console.error("Failed to delete job:", error);
    alert("Could not delete job. Please try again.");
  }
};
  

  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortStatus, setSortStatus ] = useState("Newest First");
  const [editingJobId, setEditingJobId] = useState(null);
  const formRef = useRef(null);

  const filteredJobs =
    filterStatus === "All"
      ? jobs
      : jobs.filter((job) => job.status === filterStatus);

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    const dateA = new Date(a.dateApplied);
    const dateB = new Date(b.dateApplied);
    
    if (sortStatus === "Newest First") {
      return dateB - dateA;
    } else if (sortStatus === "Oldest First") {
      return dateA - dateB;
    } else if (sortStatus === "Last 24 Hours") {
      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      return (
        (dateB >= twentyFourHoursAgo ? 1 : 0) -
        (dateA >= twentyFourHoursAgo ? 1 : 0)
      );
    } else if (sortStatus === "Last week") {
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return (
        (dateB >= oneWeekAgo ? 1 : 0) -
        (dateA >= oneWeekAgo ? 1 : 0)
      );
    }
    return 0;
  });

  const [newJob, setNewJob] = useState({
    company: "",
    role: "",
    status: "In Progress",
    notes: "",
    reachedOut: "",
    link: "",
    dateApplied: getTodayDate(),
  });

  const handleChange = (e) => {
    setNewJob({
      ...newJob,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddJob = async (e) => {
  e.preventDefault();

  try {
    if (editingJobId) {
      await updateJob(editingJobId, newJob);

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.jobId === editingJobId
            ? { ...job, ...newJob }
            : job
        )
      );
    } else {
      const jobId = await createJob(newJob);

      const jobToAdd = {
        jobId,
        ...newJob,
      };

      setJobs((prevJobs) => [...prevJobs, jobToAdd]);
    }

    setNewJob({
      company: "",
      role: "",
      status: "In Progress",
      notes: "",
      dateApplied: getTodayDate(),
      reachedOut: "",
      link: "",
    });

    setEditingJobId(null);
    setShowForm(false);
  } catch (error) {
    console.error("Failed to save job:", error);
    alert("Could not save job. Please try again.");
  }
};

const handleEdit = (job) => {
  setNewJob({
    company: job.company || "",
    role: job.role || "",
    status: job.status || "In Progress",
    notes: job.notes || "",
    reachedOut: job.reachedOut || "",
    link: job.link || "",
    dateApplied: job.dateApplied || getTodayDate(),
  });

  setEditingJobId(job.jobId);
  setShowForm(true);

  setTimeout(() => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 0);
};

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h1>Applications</h1>
        <p>Monitor your applications</p>
      </div>

      <div className="filter-jobs">
        <label className = "job-filterStatus" htmlFor="filterStatus">Filter by Status: </label>
        <select
          name="filterStatus"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="In Progress">In Progress</option>
          <option value="Applied">Applied</option>
          <option value="Accepted">Accepted</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
        </select>


        <label className = "job-sortStatus" htmlFor="sortStatus">Sort By: </label>
        <select
          name="sortStatus"
          value={sortStatus}
          onChange={(e) => setSortStatus(e.target.value)}
        >
          <option value="Newest First">Newest First</option>
          <option value="Oldest First">Oldest First</option>
          <option value="Last 24 Hours">Last 24 Hours</option>
          <option value="Last week">Last week</option>
        </select>
      </div>

      <div className="add-job">
        <button
          className="add-job-button"
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditingJobId(null);
              setNewJob({
                company: "",
                role: "",
                status: "In Progress",
                notes: "",
                reachedOut: "",
                link: "",
                dateApplied: getTodayDate(),
              });
            }
          }}
        >
          {showForm ? "Cancel" : "+ Add Job"}
        </button>
      </div>

      {showForm && (
          <form className="job-form" autoComplete="off" onSubmit={handleAddJob} ref={formRef}>
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={newJob.company}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="role"
            placeholder="Role"
            value={newJob.role}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="notes"
            placeholder="Notes"
            value={newJob.notes}
            onChange={handleChange}
          />

          <input
            type="date"
            name="dateApplied"
            value={newJob.dateApplied}
            onChange={handleChange}
          />
          <select
            name="reachedOut"
            value={newJob.reachedOut || ""}
            onChange={handleChange}
          >
            <option value="">Select one</option>
            <option value="reached">I reached out to someone</option>
            <option value="not-reached">I didn't reach out</option>
          </select>

          <input
            type="text"
            name="link"
            placeholder="Portal link"
            value={newJob.link}
            onChange={handleChange}
          />

          <select
            name="status"
            value={newJob.status}
            onChange={handleChange}
          >
            <option value="In Progress">In Progress</option>
            <option value="Applied">Applied</option>
            <option value="Accepted">Accepted</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            
          </select>

          <button type="submit">
            {editingJobId ? "Save Changes" : "Add Job"}
          </button>
        </form>
      )}

      {sortedJobs.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "50px", fontSize: "18px", color: "#64748b" }}>
          No applications match the selected filter/sort criteria.
        </p>
      )}
      <div className="jobs-list">
        {sortedJobs.map((job) => (
          <JobCard
            key={job.jobId}
            job={job}
            onDelete={confirmDelete.bind(null, job.jobId, handleDelete)}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default Jobs;