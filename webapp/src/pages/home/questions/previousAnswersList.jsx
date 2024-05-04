import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function PreviousAnswersList() {
  const [answers, setAnswers] = useState([]);
  const chatId = useSelector((state) => state.user.chatId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/userAnswers/getUserAnswers/${chatId}`
        );
        setAnswers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [chatId]);

  return (
    <div className="text-base font-light p-1 bg-white text-black font-sans">
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
