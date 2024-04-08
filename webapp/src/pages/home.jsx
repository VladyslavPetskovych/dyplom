// Home.js
const tg = window.Telegram.WebApp;
import { useEffect } from "react";
import SliderCategories from "./home/sliderCategories";
function Home() {
  useEffect(() => {
    tg.ready();
  });

  const onClose = () => {
    tg.close();
  };
  return (
    <div>
      <div className="h-screen text-white">
        <div className="flex flex-row text-black bg-white justify-between h-12">
          <p className="m-2 ml-5 text-3xl ">Здбибанка Бот</p>
          <button className="bg-slate-200 w-24" onClick={onClose}>
          ❌
          </button>
        </div>
        <div className="bg-slate-500 h-32">
          <p>Блок статистики</p>
          <p>Скільки було вже відповідей на питання</p>
          <p>Рейтинг користувача</p>
        </div>
        <div className="bg-slate-800  h-72">
          <p>Блок з питаннями</p>
          <div className="w-screen h-[160px] px-8 bg-black ">
            <SliderCategories />
          </div>
          <p>Питання (порядковий номер запитання)</p>
          <p>Шкала відповідей 1-5 (позначки з смайликами )</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
