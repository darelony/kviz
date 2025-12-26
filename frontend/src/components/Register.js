import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { registerUser } from "../api/api";
import "./GlassLogin.css"; 

function Register() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    
    try {
      const res = await registerUser(username, email, password);
      if (res.token) {
        login(res.token, res.user); 
      } else {
        alert(res.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="glass-login-page">
      <div className="glass-card">
        <h1 className="glass-title">QUIZ APP</h1>
        <form onSubmit={handleSubmit} className="glass-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="glass-btn">
            Sign Up
          </button>
        </form>
        <div className="signup-text">
          Already have an account? <Link to="/">Sign In</Link>
        </div>
      </div>
    </div>
  );
}


export default Register;
