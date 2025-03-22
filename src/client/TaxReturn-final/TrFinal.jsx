  //

  "use client";
  import { Link } from 'react-router-dom';

  import { useState, useEffect } from "react";
  import { Menu, LogOut, Upload, Download, FileText, Lock } from "lucide-react";
  import { useNavigate } from "react-router-dom";
  import "../client-dashboard/dashboard.css";
  export default function TrFinal() {
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

    // ✅ Fetch user from localStorage
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      } else {
        // If no user found, redirect to login
        navigate("/");
      }
    }, [navigate]);

    // ✅ Handle logout
    const handleLogout = () => {
      localStorage.removeItem("user"); // Clear user session
      navigate("/"); // Redirect to login
    };

    // ✅ Handle Change Password logic
    // ✅ Handle Change Password with API call
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
              email: user.email, // taking email from logged-in user
              oldPassword,
              newPassword,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          alert(data.message); // success message
          // After password update, log out user for security
          localStorage.removeItem("user");
          navigate("/"); // redirect to login
        } else {
          alert(data.message); // show error message from backend
        }
      } catch (error) {
        console.error("Error while changing password:", error);
        alert("Something went wrong. Please try again later.");
      }

      // Reset fields and close modal
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
          <h1 className="sidebar-title">{user?.firstName || "User"}</h1>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/client/tax-info">
                <Download size={18} />
                <span>Download Tax Information Form</span>
              </Link>
            </li>
            <li>
              <Link to="/client/upload-docs">
                <Upload size={18} />
                <span>Upload Documents</span>
              </Link>
            </li>
            <li>
              <Link to="/client/tax-return-final">
                <FileText size={18} />
                <span>Download Tax Return Draft Copy</span>
              </Link>
            </li>
            <li>
              <Link to="/client/tax-return-draft">
                <FileText size={18} />
                <span>Download Tax Return Final Copy</span>
              </Link>
            </li>
            <li className="separator"></li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowChangePassword(true);
                }}
              >
                <Lock size={18} />
                <span>Change Password</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Header */}
          <header className="main-header">
            <div className="user-profile">
              <div className="avatar">
                <span>{(user?.firstName?.[0] || "U").toUpperCase()}</span>
              </div>
              <span className="username">{user?.firstName || "User"}</span>
            </div>
            <button onClick={handleLogout} className="logout-button">
              Log Out <LogOut size={16} />
            </button>
          </header>


          {/* Footer */}
          <footer className="main-footer">
            <p>ELITETAX © 2025</p>
          </footer>
        </main>

        {/* Change Password Modal */}
        {showChangePassword && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Change Password</h2>
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div className="modal-buttons">
                <button onClick={handleChangePassword}>Submit</button>
                <button onClick={() => setShowChangePassword(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
