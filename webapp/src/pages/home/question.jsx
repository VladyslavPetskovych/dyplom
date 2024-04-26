import Rating from "./rating";
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
function Question({ question, onNext }) {
    const [rating, setRating] = useState(null);
    const chatId = useSelector(state => state.user.chatId);
    const handleAnswer = () => {
      console.log(rating)
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
