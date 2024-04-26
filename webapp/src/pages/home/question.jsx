import Rating from "./rating";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
function Question({ question, onNext }) {
  const [rating, setRating] = useState(null);

  const chatId = useSelector((state) => state.user.chatId);
  const handleAnswer = async () => {
    try {
      // Check if rating is selected
      if (rating === null) {
        console.error("Rating is required");
        return;
      }
console.log(question.questionNumber)
console.log(question.questionNumber)
console.log(question.questionNumber)
      // Make axios POST request to send the answer to the backend
      await axios.post("http://localhost:3000/answer", {
        chatId,
        questionId: question.questionNumber, // Assuming question has an _id property
        answer: rating, // Send the selected rating as the answer
      });

      // Call onNext to move to the next question
      onNext();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
    console.log(rating);
    onNext(rating);
    setRating(null);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p>{question.questionText}</p>
      <p>ChatID</p>
      <p>{chatId}</p>
      <Rating onRatingSelect={setRating} />
      <button onClick={handleAnswer}>Відповісти</button>
    </div>
  );
}
export default Question;
