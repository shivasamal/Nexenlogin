// AdminDashboard.js

"use client";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Menu, LogOut, Upload, Download, FileText, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./admin-dashboard.css";

export default function AdminDashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // ✅ Fetch admin from localStorage (IMPORTANT FIX)
  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setUser(storedAdmin);
    } else {
      // Redirect to admin login if not found
      navigate("/admin/login");
    }
  }, [navigate]);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("admin"); // Clear admin session
    navigate("/admin/login"); // Redirect to login
  };

  // ✅ Handle Change Password logic
  const handleChangePassword = async () => {
    if (oldPassword === newPassword) {
      alert("New password must be different from the old password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/update-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            oldPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        localStorage.removeItem("admin");
        navigate("/admin/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error while changing password:", error);
      alert("Something went wrong. Please try again later.");
    }

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowChangePassword(false);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">{user?.firstName || "Admin"}</h1>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/download-form"><Download size={18} /><span>Download Tax Information Form</span></Link></li>
            <li><Link to="/upload-docs"><Upload size={18} /><span>Upload Documents</span></Link></li>
            <li><Link to="/download-draft"><FileText size={18} /><span>Download Tax Return Draft Copy</span></Link></li>
            <li><Link to="/download-final"><FileText size={18} /><span>Download Tax Return Final Copy</span></Link></li>
            <li className="separator"></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setShowChangePassword(true); }}><Lock size={18} /><span>Change Password</span></a></li>
            <li><a href="#" onClick={handleLogout}><LogOut size={18} /><span>Logout</span></a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <div className="user-profile"><div className="avatar"><span>{(user?.firstName?.[0] || "A").toUpperCase()}</span></div><span className="username">{user?.firstName || "Admin"}</span></div>
          <button onClick={handleLogout} className="logout-button">Log Out <LogOut size={16} /></button>
        </header>

        {/* Stats Cards */}
        <div className="stats-container">
          <div className="stat-card downloads"><h2 className="stat-number">0</h2><p className="stat-label">Total Downloads</p></div>
          <div className="stat-card uploads"><h2 className="stat-number">0</h2><p className="stat-label">Total Uploads</p></div>
          <div className="stat-card drafts"><h2 className="stat-number">0</h2><p className="stat-label">Total Drafts Received</p></div>
          <div className="stat-card finals"><h2 className="stat-number">0</h2><p className="stat-label">Final Copies Received</p></div>
        </div>

        <footer className="main-footer"><p>ELITETAX © 2025</p></footer>
      </main>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Change Password</h2>
            <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <div className="modal-buttons">
              <button onClick={handleChangePassword}>Submit</button>
              <button onClick={() => setShowChangePassword(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
