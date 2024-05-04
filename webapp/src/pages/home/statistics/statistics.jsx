import React from "react";

function Statistics({chatId}) {
  return (
    <div>
      <div className="bg-slate-500 h-32 flex flex-col items-center justify-center">
        <p>Блок статистики</p>
        <p>Скільки було вже відповідей на питання</p>
        <p>Рейтинг користувача</p>
        <p>{chatId}</p>
      </div>
    </div>
  );
}

export default Statistics;
