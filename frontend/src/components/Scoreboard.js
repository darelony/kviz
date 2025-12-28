import { useEffect, useState } from "react";
import { getScoreboard, logout } from "../api/api"; 
import { useNavigate } from "react-router-dom";
import "./Scoreboard.css";

const Scoreboard = () => {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  // Učitavamo top rezultate sa servera
  useEffect(() => {
    getScoreboard()
      .then((data) => {
        if (data.scores) setScores(data.scores);
      })
      .catch((err) => console.error("Failed to fetch scoreboard:", err));
  }, []);

  // Logout funkcija
  const handleLogout = () => {
    logout();
    navigate("/"); // ide na login
  };

  // Ponovi kviz funkcija
  const handleRetry = () => {
    navigate("/quiz", { replace: true, state: { retry: true } });
  };

  if (scores.length === 0)
    return <div className="scoreboard-loading">No results yet.</div>;

  return (
    <div className="scoreboard-page">
      <div className="scoreboard-actions">
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
        <button className="btn-retry" onClick={handleRetry}>Ponovi kviz</button>
      </div>

      <h1 className="scoreboard-title">Top 20 Players</h1>
      <div className="scoreboard-grid">
        {scores.map((item, idx) => (
          <div key={idx} className="score-card">
            <h2 className="score-username">{item.username}</h2>
            <div className="score-details">
              <span className="score-points">Score: {item.score}</span>
              <span className="score-correct">✔ {item.correct}</span>
              <span className="score-wrong">✖ {item.wrong}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scoreboard;
