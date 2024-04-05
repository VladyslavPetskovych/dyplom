const tg = window.Telegram.WebApp;
import { useEffect } from "react";
import FooterMenu from "./component/footerMenu";

function App() {
  useEffect(() => {
    tg.ready();
  });

  const onClose = () => {
    tg.close();
  };

  return (
    <>
      <div className="h-screen">
        <div className="flex flex-row bg-green-100 justify-between h-8">
          <p>Телеграм бот</p>
          <button className="bg-green-400 w-24" onClick={onClose}>
            close
          </button>
        </div>
        <div className="bg-slate-200 h-32">
          <p>Блок статистики</p>
          <p>Скільки було вже відповідей на питання</p>
          <p>Рейтинг користувача</p>
        </div>
        <div className=" h-72">
          <p>Блок з питаннями</p>
          <p>категорії запитань</p>
          <p>Питання (порядковий номер запитання)</p>
          <p>Шкала відповідей 1-5 (позначки з смайликами )</p>
        </div>
      </div>
      <FooterMenu />
    </>
  );
}

export default App;
