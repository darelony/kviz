import { useEffect, useState } from "react";
import { getScoreboard } from "../api/api"; 
import "./Scoreboard.css";

const Scoreboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    getScoreboard()
      .then((data) => {
        console.log(data)
        if (data.scores) setScores(data.scores);
      })
      .catch((err) => console.error("Failed to fetch scoreboard:", err));
  }, []);

  if (scores.length === 0)
    return <div className="scoreboard-loading">Loading scoreboard...</div>;

  return (
    <div className="scoreboard-page">
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
