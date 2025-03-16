import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./loginpage.css";

const AdminLogin = () => {
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
      console.log("Login Response Data:", data); // Debug log

      if (response.ok && data.user) {
        // ✅ Save user data to localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful!");

        // ✅ Redirect to dashboard
        navigate("/dash");
      } else {
        alert(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error", err);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src="/logo1.png" alt="Logo" />
      </div>

      <div className="login-card">
        <h3 className="text-center mb-4">Login</h3>
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
        <div className="text-center mt-3">
          <a href="#" className="d-block mb-2">Forgot Password?</a>
          <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
