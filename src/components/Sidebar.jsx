import { NavLink } from "react-router-dom";
import "../css/Sidebar.css";

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>Job Tracker</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/jobs">Applications</NavLink>
        <NavLink to="/analytics">Analytics</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </aside>
  );
}

export default SideBar;