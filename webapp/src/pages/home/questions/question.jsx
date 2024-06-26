import React, { useState } from "react";
import Rating from "./rating";
import axios from "axios";
import { useSelector } from "react-redux";
function Question({ question, onNext }) {
  const chatId = useSelector((state) => state.user.chatId);
  const [rating, setRating] = useState(null);

  const handleAnswer = async () => {
    try {
      if (rating === null) {
        console.error("Rating is required");
        return;
      }
      await axios.post(
        "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/answer",
        {
          chatId,
          questionId: question.questionNumber,
          answer: rating,
        }
      );
      setRating(null);
      onNext();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center  ">
      <div className="flex flex-col justify-between w-full">
        <p className="m-1 p-1 text-left">Питання № {question.questionNumber}</p>
        <p className="p-3 bg-black bg-opacity-55 min-w-full">
          {question.questionText}
        </p>
      </div>
      <Rating selectedRating={rating} onRatingSelect={setRating} />
      <button
        onClick={handleAnswer}
        className="bg-green-600 p-2 rounded-2xl m-2"
      >
        Відповісти
      </button>
    </div>
  );
}

export default Question;
