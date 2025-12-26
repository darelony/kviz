const Question = ({ question, onAnswer, selectedOption }) => {
  if (!question) return <div>Loading question...</div>;
  if (!question.options || question.options.length === 0) return <div>No options available</div>;

  return (
    <div style={{
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      background: "rgba(255,255,255,0.8)",
      backdropFilter: "blur(10px)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease"
    }}>
      <h2 style={{ marginBottom: "16px" }}>{question.question}</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {question.options.map((opt, idx) => {
          let bgColor = "#4f46e5";
          if (selectedOption) {
            if (opt === question.correct_option) bgColor = "green";
            else if (opt === selectedOption && opt !== question.correct_option) bgColor = "red";
          }

          return (
            <li key={idx} style={{ marginBottom: "12px" }}>
              <button
                onClick={() => !selectedOption && onAnswer(opt)}
                style={{
                  padding: "12px 20px",
                  width: "100%",
                  borderRadius: "8px",
                  border: "none",
                  background: bgColor,
                  color: "white",
                  cursor: selectedOption ? "default" : "pointer",
                  transition: "background 0.3s ease, transform 0.2s ease",
                }}
                onMouseOver={e => !selectedOption && (e.target.style.transform = "scale(1.05)")}
                onMouseOut={e => !selectedOption && (e.target.style.transform = "scale(1)")}
              >
                {opt}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Question;
