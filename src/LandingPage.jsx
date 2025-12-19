import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AACBackground from "./aac/AACBackground";
import "./styles/landing.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Simple validation - in production, this would call Firebase
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (email.includes("@")) {
      // Simulate successful login
      localStorage.setItem("professionalEmail", email);
      localStorage.setItem("professionalName", email.split("@")[0]);
      navigate("/dashboard");
    } else {
      setError("Please enter a valid email");
    }
  };

  return (
    <AACBackground>
      <div className="landing-container">
        {/* FALLING LEAVES */}
        <div className="leaf">🍂</div>
        <div className="leaf">🍃</div>
        <div className="leaf">🍂</div>
        <div className="leaf">🍃</div>
        <div className="leaf">🍂</div>
        <div className="leaf">🍃</div>
        <div className="leaf">🍂</div>
        <div className="leaf">🍃</div>
        <div className="leaf">🍂</div>

        {/* WEBSITE INFO */}
        <div className="landing-content">
          <div className="landing-header">
            <img src="/logo192.png" alt="Vocalyx Logo" className="website-logo" />
            <h1 className="website-title">Vocalyx</h1>
            <p className="website-description">
              Every individual. Every voice. Empowered
            </p>
          </div>

          {/* LOGIN FORM */}
          <div className="login-card">
            <h2>Professional Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="login-btn">
                Login to Dashboard
              </button>
            </form>

            <p className="login-footer">
              Demo: Use any email and password to login
            </p>
          </div>
        </div>
      </div>
    </AACBackground>
  );
}
