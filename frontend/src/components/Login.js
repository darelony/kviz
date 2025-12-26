import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { loginUser } from "../api/api";
import "./GlassLogin.css";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);

      if (data.token) {
        login(data.token, data.user); // ⬅️ PRAVI TOKEN
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="glass-login-page">
      <div className="glass-card">
        <h1 className="glass-title">QUIZ APP</h1>

        <form onSubmit={handleSubmit} className="glass-form">
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

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="glass-btn">
            Sign In
          </button>
        </form>

        <div className="signup-text">
          Don’t have an account? <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
