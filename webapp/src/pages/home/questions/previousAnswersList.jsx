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

  const handleDeleteAnswer = async (questionId) => {
    try {
      await axios.delete(
        `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/userAnswers/deleteUserAnswer/${chatId}/${questionId}`
      );
      setAnswers((prevAnswers) =>
        prevAnswers.filter((answer) => answer.questionId !== questionId)
      );
    } catch (error) {
      console.error("Error deleting answer:", error);
    }
  };

  return (
    <div className="bg-logo3 bg-opacity-75 p-3 text-white rounded-lg shadow text-xs">
      <ul className="divide-y divide-gray-300">
        {answers.map((answer, index) => (
          <li key={index} className="flex justify-between items-start py-1">
            <span className="font-medium py-2">
              Запитання: {answer.questionText}
            </span>
            <div className="min-w-28 flex justify-between items-center">
              <span className="m-1">відповідь: {answer.userAnswer}</span>
              <button
                className="text-xs bg-red-600 p-1.5 rounded-full"
                onClick={() => handleDeleteAnswer(answer.questionId)}
              >
                —
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PreviousAnswersList;
