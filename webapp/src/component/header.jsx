import React from "react";

function Header() {
  return (
    <div className="flex flex-row text-black bg-white justify-between h-12">
      <p className="relative m-2 ml-5 text-xl ">
        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-50"></span>
        🟡 Здибанка Бот
      </p>
      <button className="bg-slate-200 w-24">❌</button>
    </div>
  );
}

export default Header;
