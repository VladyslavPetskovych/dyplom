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
  const [unansweredQuestionsList, setUnansweredQuestionsList] = useState([]);
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

          setUserAnswers(userAnswersResponse.data);

          // Filter unanswered questions before setting state
          const unanswered = questionsResponse.data.filter(
            (question) =>
              !userAnswersResponse.data.some(
                (answer) => answer.questionId === question.questionNumber
              )
          );
          setQuestions(unanswered);

          // Set unanswered questions list
          setUnansweredQuestionsList(unanswered);
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

  return (
    <div className="h-[600px] bg-black text-white ">
      <div className=" flex flex-col items-center justify-start pt-10 p-1">
        <p>Дай відповіді на питання і бот знайде схожих на тебе людей.</p>

        <DropdownMenu />
        <div className="flex text-white">
          <PrevoiusAnswers />
          <div className="bg-slate-800 border rounded-lg w-full m-1">
            {unansweredQuestionsList.length > 0 &&
            currentQuestionIndex < unansweredQuestionsList.length ? (
              <Question
                question={unansweredQuestionsList[currentQuestionIndex]}
                onNext={handleNextQuestion}
              />
            ) : (
              <p className="p-2">
                Ви уже відповіли на всі запитання. Скоро тут зявляться нові.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionsCard;
