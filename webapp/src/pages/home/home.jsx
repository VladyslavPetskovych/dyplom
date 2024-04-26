const tg = window.Telegram.WebApp;
import { useEffect, useState } from "react";
import Questions from "./questionsCard";
import axios from "axios"

function onTgReady(tg) {
  const userId = tg.initDataUnsafe.user.id;
  setId(userId);
}

function Home() {
  const [id, setId] = useState();

  useEffect(() => {
    tg.ready();

    if (window.Telegram && window.Telegram.WebApp) {
      onTgReady(window.Telegram.WebApp);
    } else {
      window.addEventListener('telegram_web_app_on_ready', (event) => {
        onTgReady(event.detail);
      });
    }
  },[]);

  const onClose = () => {
    tg.close();
  };

  return (
    <div>
      <div className="h-screen text-white text-base font-oswald font-semibold [text-shadow:_0_1px_0_rgb(0_0_0_/_90%)]">
        <div className="flex flex-row text-black bg-white justify-between h-12">
          <p className="relative m-2 ml-5 text-xl ">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-50"></span>
            🟡 Здибанка Бот
          </p>
          <button className="bg-slate-200 w-24" onClick={onClose}>
            ❌
          </button>
        </div>
        <div className="bg-slate-500 h-32 flex flex-col items-center justify-center">
          <p>Блок статистики</p>
          <p>Скільки було вже відповідей на питання</p>
          <p>Рейтинг користувача</p>
        </div>

        <Questions />
        <p>User ID: {id}</p>
        <p>User ID: {id}</p>
        <p>User ID: {id}</p>
        <p>User ID: {id}</p>
      </div>
    </div>
  );
}

export default Home;