import React, { useState, useEffect } from "react";
import axios from "axios";
import DropdownMenu from "./dropdown";
import Rating from "./rating";

function Question({ question, onNext }) {
  const [answer, setAnswer] = useState("");

  const handleAnswer = () => {

    onNext();
  };

  return (
    <div>
      <p>{question.questionText}</p>
      <Rating/>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={handleAnswer}>Submit</button>
    </div>
  );
}

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div>
      <div className="bg-slate-800 h-96">
        <p>
          Дай відповіді на питання про все підряд, щоб знайти схожих на себе
          людей.
        </p>
        <div>
          <DropdownMenu />
        </div>

        <div>
          {questions.length > 0 && currentQuestionIndex < questions.length && (
            <Question
              question={questions[currentQuestionIndex]}
              onNext={handleNextQuestion}
            />
          )}
          <p>Шкала відповідей 1-5 (позначки з смайликами)</p>
        </div>
      </div>
    </div>
  );
}

export default Questions;
