import { useEffect } from "react";
import QuestionsCard from "./questions/questionsCard";
import { useSelector } from "react-redux";
import Header from "../../components/header";
import Statistics from "./statistics/statistics";
function Home() {
  const chatId = useSelector((state) => state.user.chatId);
  return (
    <div className="bg-logo1 ">
      <div className=" text-white text-base font-popins font-semibold ">
        <Header />

        <Statistics chatId={chatId} />
        <QuestionsCard />
    
      </div>

      
    </div>
  );
}

export default Home;
