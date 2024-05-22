import { useEffect } from "react";
import QuestionsCard from "./questions/questionsCard";
import { useSelector } from "react-redux";
import Header from "../../components/header";
import Statistics from "./statistics/statistics";
function Home() {
  const chatId = useSelector((state) => state.user.chatId);
  return (
    <div className="bg-slate-300 ">
      <div className=" text-white text-base font-popins font-semibold [text-shadow:_0_1px_0_rgb(0_0_0_/_90%)]">
        <Header />

        <Statistics chatId={chatId} />
        <QuestionsCard />
    
      </div>
    </div>
  );
}

export default Home;
