import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    altContactNo: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          contactNo: formData.contactNo,
          altContactNo: formData.altContactNo,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! Please login.");
        navigate("/"); // Redirect to login
      } else {
        alert(data.message); // Show error from backend
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="signup-image">
          <img src="Signup.webp" alt="Signup Illustration" />
        </div>
        <div className="signup-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder="Enter First Name" className="form-control" value={formData.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Enter Last Name" className="form-control" value={formData.lastName} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Enter Email Id" className="form-control" value={formData.email} onChange={handleChange} required />
            <input type="text" name="contactNo" placeholder="Enter Contact No" className="form-control" value={formData.contactNo} onChange={handleChange} required />
            <input type="text" name="altContactNo" placeholder="Enter Alternate Contact No" className="form-control" value={formData.altContactNo} onChange={handleChange} />
            <input type="password" name="password" placeholder="Enter Password" className="form-control" value={formData.password} onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Enter Confirm Password" className="form-control" value={formData.confirmPassword} onChange={handleChange} required />
            <button type="submit" className="btn-primary">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
