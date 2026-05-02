import "../css/Jobs.css";
import JobCard from "../components/JobCard";
import {
  createJob,
  deleteJob,
  updateJob,
  getJobs,
  getGmailAuthUrl,
} from "../api/jobsApi";
import confirmDelete from "../components/confirmDelete";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

function Jobs({ jobs, setJobs }) {
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortStatus, setSortStatus] = useState("Newest First");
  const [editingJobId, setEditingJobId] = useState(null);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [gmailConnected, setGmailConnected] = useState(false);
  const [gmailSuggestions, setGmailSuggestions] = useState({
    statusSuggestions: [],
    newJobSuggestions: [],
  });

  const formRef = useRef(null);

  const [newJob, setNewJob] = useState({
    company: "",
    role: "",
    status: "In Progress",
    notes: "",
    reachedOut: "",
    link: "",
    dateApplied: getTodayDate(),
  });

  const filteredJobs =
    filterStatus === "All"
      ? jobs
      : jobs.filter((job) => job.status === filterStatus);

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    const dateA = new Date(a.dateApplied);
    const dateB = new Date(b.dateApplied);

    if (sortStatus === "Newest First") return dateB - dateA;
    if (sortStatus === "Oldest First") return dateA - dateB;

    if (sortStatus === "Last 24 Hours") {
      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      return (
        (dateB >= twentyFourHoursAgo ? 1 : 0) -
        (dateA >= twentyFourHoursAgo ? 1 : 0)
      );
    }

    if (sortStatus === "Last week") {
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return (
        (dateB >= oneWeekAgo ? 1 : 0) -
        (dateA >= oneWeekAgo ? 1 : 0)
      );
    }

    return 0;
  });

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("gmailConnected") === "true") {
      setGmailConnected(true);
      localStorage.setItem("gmailConnected", "true");
      window.history.replaceState({}, "", "/jobs");
    } else {
      const saved = localStorage.getItem("gmailConnected");
      if (saved === "true") {
        setGmailConnected(true);
      }
    }
  }, []);

  const handleChange = (e) => {
    setNewJob({
      ...newJob,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setNewJob({
      company: "",
      role: "",
      status: "In Progress",
      notes: "",
      reachedOut: "",
      link: "",
      dateApplied: getTodayDate(),
    });

    setEditingJobId(null);
  };

  const handleAddJob = async (e) => {
    e.preventDefault();

    try {
      if (editingJobId) {
        await updateJob(editingJobId, newJob);

        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.jobId === editingJobId ? { ...job, ...newJob } : job
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

      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error("Failed to save job:", error);
      alert("Could not save job. Please try again.");
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);

      setJobs((prevJobs) => prevJobs.filter((job) => job.jobId !== jobId));
    } catch (error) {
      console.error("Failed to delete job:", error);
      alert("Could not delete job. Please try again.");
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

  const handleConnectGmail = async () => {
    try {
      const authUrl = await getGmailAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error("Failed to connect Gmail:", error);
      alert("Could not connect Gmail. Please try again.");
    }
  };

  const handleGmailSync = async () => {
    try {
      setShowSyncModal(true);
      setGmailSuggestions({
        statusSuggestions: [],
        newJobSuggestions: [],
      });

      const res = await fetch("http://localhost:8085/gmail/sync-preview");

      if (!res.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data = await res.json();

      setGmailSuggestions({
        statusSuggestions: data.statusSuggestions || [],
        newJobSuggestions: data.newJobSuggestions || [],
      });
    } catch (err) {
      console.error(err);
      setGmailSuggestions({
        statusSuggestions: [],
        newJobSuggestions: [],
      });
    }
  };

  const acceptSuggestion = async (item) => {
    try {
      await fetch("http://localhost:8085/gmail/accept-suggestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      setGmailSuggestions((prev) => ({
        ...prev,
        statusSuggestions: prev.statusSuggestions.filter(
          (s) =>
            !(
              s.jobId === item.jobId &&
              s.emailId === item.emailId &&
              s.suggestedStatus === item.suggestedStatus
            )
        ),
      }));

      const updatedJobs = await getJobs();
      setJobs(updatedJobs);
    } catch (error) {
      console.error("Failed to accept suggestion:", error);
      alert("Could not accept suggestion. Please try again.");
    }
  };

  const declineSuggestion = async (item) => {
    try {
      await fetch("http://localhost:8085/gmail/decline-suggestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      setGmailSuggestions((prev) => ({
        ...prev,
        statusSuggestions: prev.statusSuggestions.filter(
          (s) =>
            !(
              s.jobId === item.jobId &&
              s.emailId === item.emailId &&
              s.suggestedStatus === item.suggestedStatus
            )
        ),
      }));
    } catch (error) {
      console.error("Failed to decline suggestion:", error);
      alert("Could not decline suggestion. Please try again.");
    }
  };

  const addJobFromGmail = async (item) => {
    try {
      await fetch("http://localhost:8085/gmail/add-job-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      setGmailSuggestions((prev) => ({
        ...prev,
        newJobSuggestions: prev.newJobSuggestions.filter(
          (s) => s.emailId !== item.emailId
        ),
      }));

      const updatedJobs = await getJobs();
      setJobs(updatedJobs);
    } catch (error) {
      console.error("Failed to add Gmail job:", error);
      alert("Could not add job from Gmail. Please try again.");
    }
  };

  const declineNewJob = (item) => {
    setGmailSuggestions((prev) => ({
      ...prev,
      newJobSuggestions: prev.newJobSuggestions.filter(
        (s) => s.emailId !== item.emailId
      ),
    }));
  };

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h1>Applications</h1>
        <p>Monitor your applications</p>
      </div>

      <div className="filter-jobs">
        <label className="job-filterStatus" htmlFor="filterStatus">
          Filter by Status:{" "}
        </label>
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

        <label className="job-sortStatus" htmlFor="sortStatus">
          Sort By:{" "}
        </label>
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
              resetForm();
            }
          }}
        >
          {showForm ? "Cancel" : "+ Add Job"}
        </button>

        <div className="sync-info">
          <button className="sync-button" onClick={handleConnectGmail}>
            Connect Gmail
          </button>

          <button className="sync-button" onClick={handleGmailSync}>
            Sync Gmail Updates
          </button>

          <div className="gmail-status">
            <span
              className={`status-dot ${
                gmailConnected ? "connected" : "disconnected"
              }`}
            />
            <span>{gmailConnected ? "Gmail Connected" : "Gmail Not Connected"}</span>
          </div>
        </div>
      </div>

      {showForm && (
        <form
          className="job-form"
          autoComplete="off"
          onSubmit={handleAddJob}
          ref={formRef}
        >
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

          <select name="status" value={newJob.status} onChange={handleChange}>
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
        <p
          style={{
            textAlign: "center",
            marginTop: "50px",
            fontSize: "18px",
            color: "#64748b",
          }}
        >
          No applications match the selected filter/sort criteria.
        </p>
      )}

      {showSyncModal && (
        <div className="sync-modal-overlay">
          <div className="sync-modal">
            <h2>Gmail Suggestions</h2>

            <section className="sync-section">
              <h3>Status Updates</h3>

              {gmailSuggestions.statusSuggestions.length === 0 ? (
                <p className="empty-sync-message">No status updates found.</p>
              ) : (
                <div className="sync-list">
                  {gmailSuggestions.statusSuggestions.map((item) => (
                    <div
                      className="sync-card"
                      key={`${item.jobId}-${item.emailId}-${item.suggestedStatus}`}
                    >
                      <h4>{item.company}</h4>

                      <p className="sync-status">
                        {item.currentStatus} → {item.suggestedStatus}
                      </p>

                      <p className="sync-snippet">{item.snippet}</p>

                      <div className="sync-actions">
                        <button
                          className="accept-btn"
                          onClick={() => acceptSuggestion(item)}
                        >
                          Accept
                        </button>

                        <button
                          className="decline-btn"
                          onClick={() => declineSuggestion(item)}
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="sync-section">
              <h3>New Job Suggestions</h3>

              {gmailSuggestions.newJobSuggestions.length === 0 ? (
                <p className="empty-sync-message">No new jobs found.</p>
              ) : (
                <div className="sync-list">
                  {gmailSuggestions.newJobSuggestions.map((item) => (
                    <div className="sync-card" key={item.emailId}>
                      <h4>{item.company}</h4>

                      <p className="sync-status">Status: {item.status}</p>
                      <p className="sync-status">Role: {item.role}</p>

                      <p className="sync-snippet">{item.snippet}</p>

                      <div className="sync-actions">
                        <button
                          className="accept-btn"
                          onClick={() => addJobFromGmail(item)}
                        >
                          Add Job
                        </button>

                        <button
                          className="decline-btn"
                          onClick={() => declineNewJob(item)}
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <button
              className="sync-close-button"
              onClick={() => setShowSyncModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="jobs-list">
        {sortedJobs.map((job) => (
          <motion.section
            key={job.jobId}
            className="job-card-wrapper"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <JobCard
              job={job}
              onDelete={confirmDelete.bind(null, job.jobId, handleDelete)}
              onEdit={handleEdit}
            />
          </motion.section>
        ))}
      </div>
    </div>
  );
}

export default Jobs;