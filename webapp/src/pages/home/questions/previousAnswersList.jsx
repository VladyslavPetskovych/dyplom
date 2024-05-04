import React, { useState, useEffect } from "react";
import axios from "axios";

function PreviousAnswersList() {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/userAnswers/getUserAnswers/938729564"
        );
        setAnswers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-xs font-light p-1 bg-white text-black shadow-none">
      <ul>
        {answers.map((answer, index) => (
          <li key={index} className="flex flex-row my-2">
            <p className="mr-1">Запитання:</p> {answer.questionText}{" "}
            <p className="ml-3">відповідь:</p> {answer.userAnswer}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PreviousAnswersList;
