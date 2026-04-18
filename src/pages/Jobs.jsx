import "../css/Jobs.css";
import JobCard from "../components/JobCard";
import { useState } from "react";
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
  const [editingJobId, setEditingJobId] = useState(null);

  const filteredJobs =
    filterStatus === "All"
      ? jobs
      : jobs.filter((job) => job.status === filterStatus);

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
};

const formRef = useRef(null);

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h1>Applications</h1>
        <p>Monitor your applications</p>
      </div>

      <div className="filter-jobs">
        <label htmlFor="filterStatus">Filter by Status: </label>
        <select
          name="filterStatus"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="In Progress">In Progress</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
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
        <form className="job-form" onSubmit={handleAddJob}>
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

      <div className="jobs-list">
        {filteredJobs.map((job) => (
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