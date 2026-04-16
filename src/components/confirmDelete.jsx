function confirmDelete(jobId, deleteJob) {
    if (window.confirm("Are you sure you want to delete this job?")) {
        deleteJob(jobId);
    }
}
export default confirmDelete;