import React, { useEffect, useState } from "react";
import axios from "axios";

const Modal = ({ isOpen, onClose, children }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/questions"
        );
        setQuestions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (isOpen) {
      fetchQuestions();
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleDeleteAnswer = async (questionId) => {
    try {
      await axios.delete(
        `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/questions/${questionId}`
      );
     
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question._id !== questionId)
      );
    } catch (error) {
      console.error("Error deleting answer:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white px-3 w-[85%] h-[90%] rounded-md overflow-y-auto">
        <div className="sticky top-0 bg-white flex flex-row items-center justify-between p-2">
          <div className="text-2xl font-popins">{children}</div>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Закрити
          </button>
        </div>
        <div className="overflow-y-auto mt-4">
          {questions.map((question, index) => (
            <div key={index} className="flex flex-row p-2 justify-between">
              <div className="flex flex-row">
                <p className="mx-1 bg-logo2 m-0.5">{question.questionNumber}</p>
                <p className="m-0.5">{question.questionText}</p>
              </div>
              <button
                className="text-xs bg-red-600 p-1.5 h-7 w-7 rounded-full"
                onClick={() => handleDeleteAnswer(question._id)}
              >
                —
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
