import { useEffect, useState } from "react";
import { getQuestions, submitQuiz } from "../api/api";
import Scoreboard from "./Scoreboard";
import { useLocation } from "react-router-dom";
import "./Quiz.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [remainingQuestions, setRemainingQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const location = useLocation();

  // Reset stanja kada dolazimo sa "Ponovi kviz"
  useEffect(() => {
    if (location.state?.retry) {
      setQuestions([]);
      setRemainingQuestions([]);
      setScore(0);
      setSelectedOption(null);
      setQuizFinished(false);
      setAnswers([]);

      getQuestions()
        .then((data) => {
          if (data.questions?.length) {
            setQuestions(data.questions);
            setRemainingQuestions(data.questions);
          }
        })
        .catch(console.error);
    }
  }, [location.state]);

  // Prvi put učitavanje pitanja
  useEffect(() => {
    if (!questions.length) {
      getQuestions()
        .then((data) => {
          if (data.questions?.length) {
            setQuestions(data.questions);
            setRemainingQuestions(data.questions);
          }
        })
        .catch(console.error);
    }
  }, [questions.length]);

  // Slanje odgovora kada se kviz završi
  useEffect(() => {
    if (questions.length > 0 && remainingQuestions.length === 0) {
      setQuizFinished(true);

      submitQuiz(answers)
        .then((res) => console.log("Quiz submitted:", res))
        .catch((err) => console.error("Failed to submit quiz:", err));
    }
  }, [remainingQuestions, questions, answers]);

  // Prikaz scoreboard-a kada se završi kviz
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

  if (questions.length === 0 || remainingQuestions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = remainingQuestions[0];

  if (!currentQuestion) return <div>Loading next question...</div>;

  // Funkcija za izbor odgovora
  const handleAnswer = (idx) => {
    if (selectedOption !== null) return;

    setSelectedOption(idx);

    const letter = ["A", "B", "C", "D"][idx];

    // Čuvamo odgovor u state
    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedOption: letter,
        correctOption: currentQuestion.correct_option,
      },
    ]);

    if (letter === currentQuestion.correct_option) {
      setScore((prev) => prev + 1);
    }

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
              const letter = ["A", "B", "C", "D"][idx];
              if (letter === currentQuestion.correct_option) className += " correct";
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
