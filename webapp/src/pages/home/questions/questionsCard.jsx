import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import DropdownMenu from "./slider/dropdown";
import Question from "./question";
import PreviousAnswers from "./previousAnswers";

function QuestionsCard() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [unansweredQuestionsList, setUnansweredQuestionsList] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const chatId = useSelector((state) => state.user.chatId);

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

        const unanswered = questionsResponse.data.filter(
          (question) =>
            !userAnswersResponse.data.some(
              (answer) => answer.questionId === question.questionNumber
            )
        );
        setQuestions(unanswered);
        setUnansweredQuestionsList(unanswered);
        setFilteredQuestions(unanswered);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchQuestionsAndUserAnswers();
  }, [chatId]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleCategoryClick = async (categoryId) => {
    await fetchQuestionsAndUserAnswers(); // Refresh data to include the latest answers
    const sortedQuestions = [
      ...unansweredQuestionsList.filter(
        (question) => question.category_id === categoryId
      ),
      ...unansweredQuestionsList.filter(
        (question) => question.category_id !== categoryId
      ),
    ];
    setFilteredQuestions(sortedQuestions);
    setCurrentQuestionIndex(0);
  };

  const handleAnswerSubmit = async (questionId, answer) => {
    try {
      await axios.post(
        `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/userAnswers/saveUserAnswer`,
        {
          chatId,
          questionId,
          answer,
        }
      );

      setUserAnswers((prevAnswers) => [
        ...prevAnswers,
        { questionId, answer },
      ]);

      setUnansweredQuestionsList((prevUnanswered) =>
        prevUnanswered.filter((question) => question.questionNumber !== questionId)
      );

      setFilteredQuestions((prevFiltered) =>
        prevFiltered.filter((question) => question.questionNumber !== questionId)
      );

      handleNextQuestion();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div className="h-full bg-black text-white mb-24">
      <p className="p-2">
        Дай відповіді на питання і бот знайде схожих на тебе людей.
      </p>
      <PreviousAnswers />
      <div className="flex flex-col items-center justify-start pt-2 p-1">
        <DropdownMenu onCategoryClick={handleCategoryClick} />

        <div className="flex text-white w-[90%] mb-10">
          <div className="bg-logo3 bg-opacity-55 border border-logo1 rounded-lg w-full m-1">
            {filteredQuestions.length > 0 &&
            currentQuestionIndex < filteredQuestions.length ? (
              <Question
                question={filteredQuestions[currentQuestionIndex]}
                onNext={handleNextQuestion}
                onSubmitAnswer={handleAnswerSubmit}
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
