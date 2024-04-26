import Rating from "./rating";
import React, { useState, useEffect } from "react";

function Question({ question, onNext }) {
    const [rating, setRating] = useState(null);
  
    const handleAnswer = () => {
      console.log(rating)
      onNext(rating); 
      setRating(null);
    };
  
    return (
      <div className="flex flex-col items-center justify-center">
        <p>{question.questionText}</p>
        <Rating onRatingSelect={setRating} /> 
        <button onClick={handleAnswer}>Відповісти</button>
      </div>
    );
  }
export default Question;
