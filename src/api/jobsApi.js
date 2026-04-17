export const createJob = async (job) => {
  const response = await fetch("http://localhost:8085/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });

  return await response.text();
};

export const getJobs = async () => {
  const response = await fetch("http://localhost:8085/jobs");
  return await response.json();
}

export const deleteJob = async (jobId) => {
  const response = await fetch(`http://localhost:8085/jobs/${jobId}`, {
    method: "DELETE",
  });
};

export const updateJob = async (jobId, job) => {
  const response = await fetch(`http://localhost:8085/jobs/${jobId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });

  if (!response.ok) {
    throw new Error("Failed to update job");
  }
};
