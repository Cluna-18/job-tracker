import "../css/Jobs.css";
import JobCard from "../components/JobCard";
import { useState } from "react";



//TODO: Add location as another field. Maybe data applied? Notes for portals? 


function Jobs() {

    const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

  const [jobs, setJobs] = useState([
    { id: 1, company: "Google", role: "Front End Developer", status: "Accepted", notes: "Applied on linkedIn", dateApplied: getTodayDate() },
    { id: 2, company: "American Eagle", role: "UI/UX Designer", status: "Rejected", notes: "Did not meet requirements", dateApplied: getTodayDate() },
    { id: 3, company: "UIC", role: "Entry Level Front End Developer", status: "In Progress", notes: "Awaiting response", dateApplied: getTodayDate() },
  ]);

  const handleDelete = (id) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };



  //Used for showing the form to add new jobs
  const [showForm, setShowForm] = useState(false);

  const [newJob, setNewJob] = useState({
    company: "", role: "", status: "In Progress", notes: "", dateApplied: getTodayDate(),
  });

  const handleChange = (e) => {
    setNewJob({
      ...newJob,
      [e.target.name]: e.target.value,
    });
  };


  //This is the entire function to handle adding new jobs to list. Passed to button
  const handleAddJob = (e) => {
  e.preventDefault();

  if (editingJobId) {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === editingJobId ? { ...job, ...newJob } : job
      )
    );
  } else {
    const jobToAdd = {
      id: Date.now(),
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
  });

  setEditingJobId(null);
  setShowForm(false);
};

  //TODO: Add edit functionality to jobcard
  const [editingJobId, setEditingJobId] = useState(null);

  const handleEdit = (job) => {
  setNewJob({
    company: job.company,
    role: job.role,
    status: job.status,
    dateApplied: job.dateApplied,
  });

  setEditingJobId(job.id);
  setShowForm(true);
};

    //Helper function to get current date
  









  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h1>Applications</h1>
        <p>Monitor your applications</p>
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
            name="status"
            value={newJob.status}
            onChange={handleChange}
          >
            <option value="In Progress">In Progress</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>

            <button type="submit">
                {editingJobId ? "Save Changes" : "Add Job"}
            </button>        
        </form>
      )}

      <div className="jobs-list">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
}

export default Jobs;