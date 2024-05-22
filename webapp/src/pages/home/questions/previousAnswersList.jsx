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
    <div className="bg-logo3 bg-opacity-75 p-4 text-white rounded-lg shadow text-xs">
      <ul className="divide-y divide-gray-300">
        {answers.map((answer, index) => (
          <li key={index} className="flex justify-between py-2">
            <span className="font-medium">Запитання: {answer.questionText}</span>
            <span>відповідь: {answer.userAnswer}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PreviousAnswersList;
