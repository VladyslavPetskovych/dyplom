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
        <div className="h-96  p-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis eaque
          numquam rerum praesentium maiores soluta commodi odio consequatur
          sequi 
        </div>
      </div>
    </div>
  );
}

export default Home;
