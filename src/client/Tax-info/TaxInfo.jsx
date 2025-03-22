"use client";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, LogOut, Upload, Download, FileText, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../client-dashboard/dashboard.css"
export default function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Download form-related state
  const [formList, setFormList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const yearButtons = [2020, 2021, 2022, 2023, 2024];

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Fetch user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Handle Change Password logic
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
      const response = await fetch("http://localhost:5000/api/update-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, oldPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        localStorage.removeItem("user");
        navigate("/");
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

  // Handle year download and add to form list
  const handleYearDownload = (year) => {
    console.log(`Download triggered for year: ${year}`);
    const newForm = {
      id: formList.length + 1,
      category: "Tax Organizer",
      year,
      fileName: `Tax Organizer - ${year}`,
      datetime: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    setFormList((prev) => [newForm, ...prev]);
  };

  // Search & pagination logic
  const filteredData = formList.filter((item) =>
    item.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

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

        {/* Download Section replacing stats */}
        <h3>Download Form</h3>
        <div style={{ marginBottom: "20px" }}>
          {yearButtons.map((year) => (
            <button
              key={year}
              onClick={() => handleYearDownload(year)}
              style={{
                marginRight: "10px",
                marginBottom: "10px",
                padding: "8px 12px",
                backgroundColor: "#198754",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Search & Pagination */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <label>
            Show{" "}
            <select
              value={recordsPerPage}
              onChange={(e) => setRecordsPerPage(Number(e.target.value))}
            >
              {[10, 25, 50, 100].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>{" "}
            entries
          </label>

          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <table width="100%" border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Category</th>
              <th>Year</th>
              <th>File Name</th>
              <th>Datetime</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length ? (
              paginatedData.map((item, index) => (
                <tr key={item.id}>
                  <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                  <td>{item.category}</td>
                  <td>{item.year}</td>
                  <td>{item.fileName}</td>
                  <td>{item.datetime}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" align="center">No Data Available</td></tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}
