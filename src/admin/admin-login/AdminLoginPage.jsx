import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./admin-login.css"; // Ensure this CSS exists

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Admin Login Response Data:", data);

      if (response.ok && data.user) {
        // ✅ Save data first, then redirect
        localStorage.setItem("adminAuthToken", data.token);
        localStorage.setItem("admin", JSON.stringify(data.user));

        alert("Admin Login successful!");
        navigate("dashboard"); // Corrected route path
      } else {
        alert(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Admin Login error", err);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="login-container">
  <div className="logo-container">
    <img src="/logo1.png" alt="Logo" />
  </div>

      <div className="login-card">
        <h3 className="text-center mb-4">Admin Login</h3>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
