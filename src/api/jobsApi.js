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