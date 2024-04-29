import { useEffect } from "react";
import Questions from "./questions/questionsCard";
import { useSelector } from "react-redux";
import Header from "../../component/header";

function Home() {
  const chatId = useSelector((state) => state.user.chatId);
  return (
    <div className="bg-slate-300">
      <div className=" text-white text-base font-oswald font-semibold [text-shadow:_0_1px_0_rgb(0_0_0_/_90%)]">
        <Header />
        <div className="bg-slate-500 h-32 flex flex-col items-center justify-center">
          <p>Блок статистики</p>
          <p>Скільки було вже відповідей на питання</p>
          <p>Рейтинг користувача</p>
          <p>{chatId}</p>
        </div>

        <Questions />
        <div className="h-96  p-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis eaque
          numquam rerum praesentium maiores soluta commodi odio consequatur
          sequi a illo fuga, beatae voluptate corporis earum unde doloribus.
          Blanditiis, iusto?
        </div>
      </div>
    </div>
  );
}

export default Home;
