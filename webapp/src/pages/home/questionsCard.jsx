import React, { useState, useEffect } from "react";
import axios from "axios";
import DropdownMenu from "./dropdown";
import Question from "./question";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3002/dyp/questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }

    };

    fetchQuestions();
  }, []);

  const handleNextQuestion = () => {
    // Increment the current question index
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="">
      <div className="bg-green-800 h-96 flex flex-col items-center justify-start">
        <p>Дай відповіді на питання і бот знайде схожих на тебе людей.</p>
        <div>
          <DropdownMenu />
        </div>
        <pre className="">{JSON.stringify(questions, null, 2)}</pre>
        <div>
          {questions.length > 0 && currentQuestionIndex < questions.length && (
            <Question
              question={questions[currentQuestionIndex]}
              onNext={handleNextQuestion}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Questions;
