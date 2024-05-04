import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import DropdownMenu from "./dropdown";
import Question from "./question";
import PrevoiusAnswers from "./previousAnswers";

function QuestionsCard() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const chatId = useSelector((state) => state.user.chatId);

  useEffect(() => {
    const fetchQuestionsAndUserAnswers = async () => {
      try {
        if (chatId !== null) {
          const [questionsResponse, userAnswersResponse] = await Promise.all([
            axios.get(
              "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/questions"
            ),
            axios.get(
              `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/userAnswers/getUserAnswers/${chatId}`
            ),
          ]);

          setQuestions(questionsResponse.data);
          setUserAnswers(userAnswersResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQuestionsAndUserAnswers();
  }, [chatId]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const isQuestionAnswered = (questionId) => {
    //console.log(questionId);
    return userAnswers.some((answer) => answer.questionId === questionId);
  };

  return (
    <div className="h-[600px] bg-black text-white ">
      <div className="  flex flex-col items-center justify-start">
        <p>Дай відповіді на питання і бот знайде схожих на тебе людей.</p>

        <DropdownMenu />
        <div className="flex text-white">
          <PrevoiusAnswers />
          <div className="bg-slate-800 border rounded-lg w-full">
            {console.log(userAnswers)}
            {questions.length > 0 && userAnswers.length > 0 && (
              <Question
                question={questions[currentQuestionIndex]}
                onNext={handleNextQuestion}
                isAnswered={isQuestionAnswered(
                  questions[currentQuestionIndex]?.id
                )}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionsCard;
