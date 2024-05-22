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
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus accusantium labore iusto natus neque ipsa corporis cupiditate molestiae perspiciatis nostrum? Delectus obcaecati nisi accusantium assumenda est rerum voluptatem, reprehenderit laboriosam.</p>
    </div>
  );
}

export default Home;
