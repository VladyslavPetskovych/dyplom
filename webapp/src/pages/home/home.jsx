// Home.js
const tg = window.Telegram.WebApp;
import { useEffect } from "react";
import Questions from "./questions";

function Home() {
  useEffect(() => {
    tg.ready();
  });

  const onClose = () => {
    tg.close();
  };
  return (
    <div>
      <div className="h-screen text-white text-base font-oswald font-semibold [text-shadow:_0_1px_0_rgb(0_0_0_/_90%)]">
        <div className="flex flex-row text-black bg-white justify-between h-12">
          <p className="m-2 ml-5 text-xl ">🟡 Здибанка Бот</p>
          <button className="bg-slate-200 w-24" onClick={onClose}>
            ❌
          </button>
        </div>
        <div className="bg-slate-500 h-32">
          <p>Блок статистики</p>
          <p>Скільки було вже відповідей на питання</p>
          <p>Рейтинг користувача</p>
        </div>
        <Questions />
      </div>
    </div>
  );
}

export default Home;
