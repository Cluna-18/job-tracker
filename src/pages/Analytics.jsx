import "../css/Analytics.css";
import { motion } from "framer-motion";

function Analytics({ jobs }) {
  const totalApplications = jobs.length;
  const acceptedCount = jobs.filter((job) => job.status === "Accepted").length;
  const rejectedCount = jobs.filter((job) => job.status === "Rejected").length;
  const inProgressCount = jobs.filter((job) => job.status === "In Progress").length;
  const appliedCount = jobs.filter((job) => job.status === "Applied").length;
  const interviewCount = jobs.filter((job) => job.status === "Interview").length;

  const acceptanceRate =
    totalApplications > 0 ? ((acceptedCount / totalApplications) * 100).toFixed(1) : 0;
  const rejectionRate =
    totalApplications > 0 ? ((rejectedCount / totalApplications) * 100).toFixed(1) : 0;
  const inProgressRate =
    totalApplications > 0 ? ((inProgressCount / totalApplications) * 100).toFixed(1) : 0;
  const appliedRate =
    totalApplications > 0 ? ((appliedCount / totalApplications) * 100).toFixed(1) : 0;
  const interviewRate =
    totalApplications > 0 ? ((interviewCount / totalApplications) * 100).toFixed(1) : 0;

  const stats = [
    { title: "Total Applications", value: totalApplications },
    { title: "Applied", value: appliedCount },
    { title: "In Progress", value: inProgressCount },
    { title: "Interview", value: interviewCount },
    { title: "Accepted", value: acceptedCount },
    { title: "Rejected", value: rejectedCount },
  ];

  const rates = [
    { title: "Acceptance Rate", value: `${acceptanceRate}%` },
    { title: "Rejection Rate", value: `${rejectionRate}%` },
    { title: "In Progress Rate", value: `${inProgressRate}%` },
    { title: "Applied Rate", value: `${appliedRate}%` },
    { title: "Interview Rate", value: `${interviewRate}%` },
  ];

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

  const weeklyGoal = 10;

  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);

  const appsThisWeek = jobs.filter((job) => {
    const appliedDate = new Date(job.dateApplied);
    return appliedDate >= oneWeekAgo && appliedDate <= today;
  }).length;

  const appsRemaining = Math.max(weeklyGoal - appsThisWeek, 0);
  const goalMet = appsThisWeek >= weeklyGoal;
  const goalPercent = Math.min((appsThisWeek / weeklyGoal) * 100, 100);

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1>Analytics</h1>
        <p>View how you are doing</p>
      </div>

      <motion.section
        className="analytics-section"
        variants={fadeInLeft}
        initial="hidden"
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2>Overview</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="analytics-section"
        variants={fadeInLeft}
        initial="hidden"
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2>Weekly Goal</h2>

        <div className="goal-card">
          <h3>{appsThisWeek} / {weeklyGoal} Applications This Week</h3>

          {goalMet ? (
            <p className="goal-message success">
              You hit your goal this week. Keep it up.
            </p>
          ) : (
            <p className="goal-message">
              {appsRemaining} more application{appsRemaining !== 1 ? "s" : ""} to reach your weekly goal.
            </p>
          )}

          <div className="goal-progress-bar">
            <div
              className="goal-progress-fill"
              style={{ width: `${goalPercent}%` }}
            ></div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="analytics-section"
        variants={fadeInLeft}
        initial="hidden"
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2>Application Status Distribution</h2>
        <div className="rates-grid">
          {rates.map((stat, index) => (
            <div className="rates-card" key={index}>
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="analytics-section"
        variants={fadeInLeft}
        initial="hidden"
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2>Graphs</h2>

        <div className="graphs-section">
          <div className="graph-placeholder-card">
            <h3>Applications Over Time</h3>
            <p>Line chart placeholder</p>
          </div>

          <div className="graph-placeholder-card">
            <h3>Status Breakdown</h3>
            <p>Bar chart or pie chart placeholder</p>
          </div>

          <div className="graph-placeholder-card">
            <h3>More Insights</h3>
            <p>Reached out stats, locations, or other trends later</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Analytics;