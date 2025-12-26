import { useEffect, useState } from "react";
import { getQuestions } from "../api/api";
import Scoreboard from "./Scoreboard";
import "./Quiz.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [remainingQuestions, setRemainingQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  //eslint-disable-next-line
  const [answers, setAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    getQuestions()
      .then((data) => {
        console.log("Fetched questions:", data.questions);
        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
          setRemainingQuestions(data.questions);
        }
      })
      .catch((err) => console.error("Failed to fetch questions:", err));
  }, []);

  useEffect(() => {
    // Kada nema preostalih pitanja, završava kviz
    if (remainingQuestions.length === 0 && questions.length > 0) {
      setQuizFinished(true);
    }
  }, [remainingQuestions, questions]);

  if (questions.length === 0) return <div>Loading questions...</div>;

  // Ako je kviz završen, prikaži rezultat i Scoreboard
  if (quizFinished) {
    return (
      <div className="quiz-result-container">
        <div className="quiz-result">
          Quiz finished! Your score: {score} / {questions.length}
        </div>
        <Scoreboard />
      </div>
    );
  }

  // Proveri da li trenutno pitanje postoji
  const currentQuestion = remainingQuestions[0];
  if (!currentQuestion) return <div>Loading next question...</div>;

  const handleAnswer = (idx) => {
    if (selectedOption !== null) return;

    setSelectedOption(idx);

    const optionLetter = ["A", "B", "C", "D"][idx];
    const isCorrect = optionLetter === currentQuestion.correct_option;
    if (isCorrect) setScore((prev) => prev + 1);

    setAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion.id, selected: optionLetter },
    ]);

    setTimeout(() => {
      setSelectedOption(null);
      setRemainingQuestions((prev) => prev.slice(1));
    }, 1000);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h2 className="quiz-question">{currentQuestion.text}</h2>
        <div className="quiz-options">
          {currentQuestion.options.map((opt, idx) => {
            let className = "quiz-btn";
            if (selectedOption !== null) {
              const optionLetter = ["A", "B", "C", "D"][idx];
              if (optionLetter === currentQuestion.correct_option)
                className += " correct";
              else if (idx === selectedOption) className += " wrong";
            }
            return (
              <button
                key={idx}
                className={className}
                onClick={() => handleAnswer(idx)}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
